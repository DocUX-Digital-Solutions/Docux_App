import { KinesisClient, PutRecordCommand } from '@aws-sdk/client-kinesis'
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs'
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers'

export class AWSAudioAggregator {
  public client: KinesisClient
  protected streamARN: string
  protected streamName: string
  protected partitionKey: string
  protected queueARN: string
  protected region: string
  protected sequenceIDs: string[] = []
  protected idToken: string
  protected physicianId: string

  public shardId: string | null = null
  public sequenceNum: string | null = null

  constructor(
    //credentialsObject: AwsCredentialIdentity,
    idToken: string,
    physician_id: string,
    streamARN: string,
    streamName: string,
    appointmentID: string,
    queueARN: string,
    region: string,
  ) {
    this.client = new KinesisClient({
      region: import.meta.env.VITE_REACT_APP_AWS_REGION as string,
      credentials: fromCognitoIdentityPool({
        clientConfig: {
          region: import.meta.env.VITE_REACT_APP_AWS_REGION as string,
        },
        identityPoolId: import.meta.env.VITE_REACT_APP_IDENTITY_POOL_ID,
        logins: {
          'cognito-idp.us-east-1.amazonaws.com/us-east-1_ZRXeRemoP': idToken,
        },
      }),
    })
    this.streamARN = streamARN
    this.partitionKey = appointmentID
    this.streamName = streamName
    this.queueARN = queueARN
    this.region = region
    this.idToken = idToken
    this.physicianId = physician_id
  }

  putAudio(buffer: ArrayBuffer, addSequenceEntry: boolean = false) {
    const input = {
      // PutRecordInput
      Data: new Uint8Array(buffer), // e.g. Buffer.from("") or new TextEncoder().encode("")   // required
      PartitionKey: this.partitionKey, // required
      StreamARN: this.streamARN,
      StreamName: this.streamName,
    }
    const command = new PutRecordCommand(input)
    const res = this.client.send(command)
    res
      .then(val => {
        this.shardId = val.ShardId || null
        this.sequenceNum = val.SequenceNumber || null
        if (addSequenceEntry)
          this.addSequence(val.ShardId as string, val.SequenceNumber as string)
      })
      .catch(error => {
        console.error(
          'Error occurred when attempting to add sequence: ' + error,
        )
      })
  }

  protected addSequence(shardID: string, sequenceNumber: string) {
    this.sequenceIDs.push(shardID + ':' + sequenceNumber)
  }

  batchRecords(): Promise<void> {
    return new Promise((resolve, reject) => {
      const jsonArray = [...this.sequenceIDs]
      const messageBody = {
        encounterId: this.partitionKey,
        physicianId: this.physicianId,
        sequences: jsonArray,
      }

      const client = new SQSClient({
        region: this.region,
        credentials: fromCognitoIdentityPool({
          clientConfig: { region: this.region },
          identityPoolId: import.meta.env.VITE_REACT_APP_IDENTITY_POOL_ID,
          logins: {
            'cognito-idp.us-east-1.amazonaws.com/us-east-1_ZRXeRemoP':
              this.idToken,
          },
        }),
      })

      const input = {
        QueueUrl: this.queueARN,
        MessageBody: JSON.stringify(messageBody),
      }
      const command = new SendMessageCommand(input)
      client
        .send(command)
        .then(() => {
          console.log('Batching completed successfully.')
          resolve()
        })
        .catch(error => {
          console.error('Error batching records:', error)
          reject(error)
        })
    })
  }
}
