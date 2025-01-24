import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from 'axios';

import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';

import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager';

import { Platform } from 'react-native';
import Constants from 'expo-constants'; // Use this for environment variables in Expo

type VeraResponse = {
  type: string;
  content: {
    outputs: {
      vera_answer: {
        value: string;
      };
    };
  };
};

type MessageProps = {
  text: string;
  actor: 'user' | 'bot';
};

export class VeraClient {
  protected setMessages: (m: MessageProps[]) => void;

  constructor(setMessages: (m: MessageProps[]) => void) {
    this.setMessages = setMessages;
  }

  protected async configureClient(
    token: string
  ): Promise<[AxiosInstance, AxiosRequestConfig]> {
    const apiKey = await this.getApiKey("DEMO_VERA_API_KEY", token);

    const client: AxiosInstance = axios.create({
      baseURL: "https://app.vera-health.ai/api/external/medical-api", // Base URL for Vera
    });

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      } as RawAxiosRequestHeaders,
    };

    return [client, config];
  }

  protected async getApiKey(
    parameterName: string,
    token: string
  ): Promise<string> {
    const secret_name = parameterName;

    const client = new SecretsManagerClient({
      region: "us-east-1", // AWS Region
      credentials: fromCognitoIdentityPool({
        clientConfig: {
          region: "us-east-1" as string,
        },
        identityPoolId:"us-east-1:8ea5e5a7-33b8-40a2-908e-97791ed5d401", // Cognito Identity Pool ID
        logins: {
          [`cognito-idp.${"us-east-1"}.amazonaws.com/${"us-east-1_kFmUaGHD0"}`]: token,
        },
      }),
    });

    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: 'AWSCURRENT', // Defaults to AWSCURRENT
      })
    );

    const key = JSON.parse(response.SecretString as string);
    return key["DEMO_VERA_API_KEY"];
  }

  async askVera() {
    const data = { question: "Testing this out" };
    let responseFound = false;
    const [client, config] = await this.configureClient("us-east-1");

    const response: AxiosResponse = await client.post(`/`, data, config);

    // for (let i = 0; i < split.length; i++) {
    //   const content = split[i].length > 0 ? JSON.parse(split[i]) : {};
    //   if (content.type === 'END') {
    //     responseFound = true;
    //     this.parseResponse(content, messages);
    //   }
    // }

    if (!responseFound) {
      this.setMessages([
        {text:'Hello',
        actor:'user'
        },
        {
          text: 'An issue occurred while processing response from Vera. Please try asking again.',
          actor: 'bot',
        },
      ]);
    }
  }

  private parseResponse(content: VeraResponse, messages: MessageProps[]) {
    const response = JSON.parse(content.content.outputs.vera_answer.value);
    const responseText = response.text;
    this.setMessages([...messages, { text: responseText, actor: 'bot' }]);
  }
}
