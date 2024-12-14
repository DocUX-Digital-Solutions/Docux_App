import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import SvgQRCode from 'react-native-qrcode-svg';
import { useAuth } from '../../src/hooks/useAuth';

interface TOTPSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  setupUri: string;
}

const TOTPSetupModal: React.FC<TOTPSetupModalProps> = ({
  isOpen,
  onClose,
  setupUri,
}) => {
  const [totpCode, setTotpCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { confirmTOTP } = useAuth();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      await confirmTOTP(totpCode);
      onClose();
    } catch (err) {
      setError('Invalid TOTP code. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isVisible={isOpen} onBackdropPress={onClose}>
      <View style={styles.modalContent}>
        <Text style={styles.header}>TOTP Setup</Text>
        <Text style={styles.instructions}>Scan the QR code below with your authenticator app:</Text>
        <SvgQRCode value={setupUri} size={200} />
        <TextInput
          style={styles.input}
          placeholder="Enter the code from your app"
          value={totpCode}
          onChangeText={setTotpCode}
        />
        {error && <Text style={styles.error}>{error}</Text>}
        <View style={styles.buttonContainer}>
          <Button title="Verify" onPress={handleSubmit} disabled={isSubmitting} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  instructions: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default TOTPSetupModal;
