# Schulnotiz App

Eine mobile App zur Organisation von Schulnotizen mit OCR-Technologie, basierend auf Expo und React Native.

## Funktionen

- **OCR-Texterkennung**: Scannen Sie Ihre handschriftlichen oder gedruckten Notizen
- **Firebase-Integration**: Speichern Sie Ihre Notizen sicher in der Cloud
- **Google-Authentifizierung**: Einfache und sichere Anmeldung mit Ihrem Google-Konto
- **Benutzerfreundliche Oberfläche**: Intuitive Benutzeroberfläche für einfache Navigation
- **Plattformübergreifend**: Funktioniert auf iOS und Android

## Voraussetzungen

- Node.js (v14 oder höher)
- Expo CLI (`npm install -g expo-cli`)
- Firebase-Konto
- Google Cloud-Konto (für Google-Authentifizierung)

## Einrichtung

### 1. Projekt klonen

```bash
git clone https://github.com/ihr-benutzername/schulnotiz-app.git
cd schulnotiz-app
```

### 2. Abhängigkeiten installieren

```bash
npm install
```

### 3. Firebase-Projekt einrichten

1. Erstellen Sie ein neues Projekt in der [Firebase-Konsole](https://console.firebase.google.com/)
2. Aktivieren Sie Firestore und Authentication (mit Google als Anbieter)
3. Laden Sie die Konfigurationsdateien herunter:
   - Für iOS: `GoogleService-Info.plist`
   - Für Android: `google-services.json`
4. Platzieren Sie diese Dateien im Stammverzeichnis des Projekts

### 4. Firebase-Konfiguration aktualisieren

Bearbeiten Sie die Datei `src/config/firebase.js` und ersetzen Sie die Platzhalter mit Ihren eigenen Firebase-Konfigurationsdaten.

### 5. Google-Authentifizierung einrichten

1. Gehen Sie zur [Google Cloud Console](https://console.cloud.google.com/)
2. Erstellen Sie ein neues Projekt oder wählen Sie Ihr Firebase-Projekt
3. Konfigurieren Sie die OAuth-Zustimmungsbildschirm
4. Erstellen Sie OAuth-Client-IDs für Web, iOS und Android
5. Aktualisieren Sie die `GOOGLE_AUTH_CONFIG` in `src/config/firebase.js`

### 6. App starten

```bash
expo start
```

## Deployment

### EAS Build einrichten

1. Installieren Sie EAS CLI:
   ```bash
   npm install -g eas-cli
   ```

2. Melden Sie sich bei Expo an:
   ```bash
   eas login
   ```

3. Konfigurieren Sie Ihr Projekt:
   ```bash
   eas build:configure
   ```

### Build für iOS erstellen

```bash
eas build --platform ios
```

### Build für Android erstellen

```bash
eas build --platform android
```

## Projektstruktur

```
schulnotiz-app/
├── assets/                # Bilder und Ressourcen
├── modules/               # Native Module (OCR)
├── src/
│   ├── components/        # Wiederverwendbare Komponenten
│   ├── config/            # Konfigurationsdateien
│   ├── hooks/             # Custom React Hooks
│   ├── navigation/        # Navigationsstruktur
│   ├── screens/           # App-Bildschirme
│   ├── services/          # Dienste (Firebase, etc.)
│   └── utils/             # Hilfsfunktionen
├── App.js                 # Hauptanwendungskomponente
├── app.json               # Expo-Konfiguration
└── package.json           # Abhängigkeiten
```

## Lizenz

MIT

## Kontakt

Ferdinand  - info@fvb-media.de

Projektlink: [https://github.com/ihr-benutzername/schulnotiz-app](https://github.com/ihr-benutzername/schulnotiz-app)


Terminal für notes:

The default interactive shell is now zsh.
To update your account to use zsh, please run `chsh -s /bin/zsh`.
For more details, please visit https://support.apple.com/kb/HT208050.
MBP-von-Jana:expo-ocr-example Ferdinand$ echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.zshrc
echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.zshrc
echo '[ -s "$NVM_DIR/bash_completioMBP-von-Jana:expo-ocr-example Ferdinand$ echo '[ -s "$NVM_DIR/nvm.s.zshrc& \. "$NVM_DIR/nvm.sh"' >> ~/ 
echo '[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"' >> ~/.zshrc
MBP-von-Jana:expo-ocr-example Ferdinand$ echo '[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"' >> ~/.zshrc
MBP-von-Jana:expo-ocr-example Ferdinand$ export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
MBP-von-Jana:expo-ocr-example Ferdinand$ [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
MBP-von-Jana:expo-ocr-example Ferdinand$ source ~/.zshrc
MBP-von-Jana:expo-ocr-example Ferdinand$ nvm --version
0.39.1
MBP-von-Jana:expo-ocr-example Ferdinand$ nvm install node
Downloading and installing node v23.10.0...
Downloading https://nodejs.org/dist/v23.10.0/node-v23.10.0-darwin-arm64.tar.xz...
############################################################################################### 100.0%
Computing checksum with shasum -a 256
Checksums matched!
Now using node v23.10.0 (npm v10.9.2)
Creating default alias: default -> node (-> v23.10.0)
MBP-von-Jana:expo-ocr-example Ferdinand$ npm install -g eas-cli
npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm warn deprecated rimraf@2.4.5: Rimraf versions prior to v4 are no longer supported
npm warn deprecated lodash.get@4.4.2: This package is deprecated. Use the optional chaining (?.) operator instead.
npm warn deprecated @oclif/screen@3.0.8: Package no longer supported. Contact Support at https://www.npmjs.com/support for more info.
npm warn deprecated glob@6.0.4: Glob versions prior to v9 are no longer supported
npm warn deprecated sudo-prompt@9.1.1: Package no longer supported. Contact Support at https://www.npmjs.com/support for more info.
npm warn deprecated @xmldom/xmldom@0.7.13: this version is no longer supported, please update to at least 0.8.*

added 443 packages in 8s

53 packages are looking for funding
  run `npm fund` for details
MBP-von-Jana:expo-ocr-example Ferdinand$ eas build --profile development --platform ios
An Expo user account is required to proceed.

Log in to EAS with email or username (exit and run eas login --help to see other login options)
✔ Email or username … ferdinandfvb
✔ Password … ********************
Failed to read the app config from the project using "npx expo config" command: npx expo config --json exited with non-zero code: 1.
Falling back to the version of "@expo/config" shipped with the EAS CLI.
Failed to resolve plugin for module "expo-image-picker" relative to "/Users/Ferdinand/Documents/expo-ocr-example"
    Error: build command failed.
MBP-von-Jana:expo-ocr-example Ferdinand$ eas build --profile development --platform ios
You don't have the required permissions to perform this operation.

This can sometimes happen if you are logged in as incorrect user.
Run eas whoami to check the username you are logged in as.
Run eas login to change the account.

Original error message: Entity not authorized: AppEntity[017b992e-6e53-431d-9388-54a57843c992] (viewer = RegularUserViewerContext[e647eff2-949d-4462-8b93-cc2f3911d8c3], action = READ, ruleIndex = -1)
Request ID: d5be8e6f-8cff-4780-821c-7e13a00d878e
    Error: GraphQL request failed.
MBP-von-Jana:expo-ocr-example Ferdinand$ eas whoami
ferdinandfvb
MBP-von-Jana:expo-ocr-example Ferdinand$ npx eas build:configure
You don't have the required permissions to perform this operation.

This can sometimes happen if you are logged in as incorrect user.
Run eas whoami to check the username you are logged in as.
Run eas login to change the account.

Original error message: Entity not authorized: AppEntity[017b992e-6e53-431d-9388-54a57843c992] (viewer = RegularUserViewerContext[e647eff2-949d-4462-8b93-cc2f3911d8c3], action = READ, ruleIndex = -1)
Request ID: 73bc77b3-d90a-4f0b-87ee-9243834ce774
    Error: GraphQL request failed.
MBP-von-Jana:expo-ocr-example Ferdinand$ eas build:configure
EAS project not configured.
✔ Would you like to automatically create an EAS project for @ferdinandfvb/schulnotiz-app? … yes
✔ Created @ferdinandfvb/schulnotiz-app: https://expo.dev/accounts/ferdinandfvb/projects/schulnotiz-app on EAS
✔ Linked local project to EAS project 2af312b8-b2b0-46dc-8b25-4c213f662ace
💡 The following process will configure your iOS and/or Android project to be compatible with EAS Build. These changes only apply to your local project files and you can safely revert them at any time.

✔ Which platforms would you like to configure for EAS Build? › iOS

🎉 Your project is ready to build.

- Run eas build when you are ready to create your first build.
- Once the build is completed, run eas submit to upload the app to app stores.
- Learn more about other capabilities of EAS Build: https://docs.expo.dev/build/introduction
MBP-von-Jana:expo-ocr-example Ferdinand$ 



nochmehr :
MBP-von-Jana:expo-ocr-example Ferdinand$ eas build:configure
EAS project not configured.
✔ Would you like to automatically create an EAS project for @ferdinandfvb/schulnotiz-app? … yes
✔ Created @ferdinandfvb/schulnotiz-app: https://expo.dev/accounts/ferdinandfvb/projects/schulnotiz-app on EAS
✔ Linked local project to EAS project 2af312b8-b2b0-46dc-8b25-4c213f662ace
💡 The following process will configure your iOS and/or Android project to be compatible with EAS Build. These changes only apply to your local project files and you can safely revert them at any time.

✔ Which platforms would you like to configure for EAS Build? › iOS

🎉 Your project is ready to build.

- Run eas build when you are ready to create your first build.
- Once the build is completed, run eas submit to upload the app to app stores.
- Learn more about other capabilities of EAS Build: https://docs.expo.dev/build/introduction
MBP-von-Jana:expo-ocr-example Ferdinand$ eas build
✔ Select platform › iOS
Resolved "production" environment for the build. Learn more: https://docs.expo.dev/eas/environment-variables/#setting-the-environment-for-your-builds
No environment variables with visibility "Plain text" and "Sensitive" found for the "production" environment on EAS.

✔ iOS app only uses standard/exempt encryption? Learn more: https://developer.apple.com/documentation/Security/complying-with-encryption-export-regulations … yes
No remote versions are configured for this project, buildNumber will be initialized based on the value from the local project.
✔ Initialized buildNumber with 1.
✔ Using remote iOS credentials (Expo server)

If you provide your Apple account credentials we will be able to generate all necessary build credentials and fully validate them.
This is optional, but without Apple account access you will need to provide all the missing values manually and we can only run minimal validation on them.
✔ Do you want to log in to your Apple account? … yes

› Log in to your Apple Developer account to continue
✔ Apple ID: … boeck.jana@web.de
› The password is only used to authenticate with Apple and never stored on EAS servers
  Learn more: https://bit.ly/2VtGWhU
✔ Password (for boeck.jana@web.de): … ********
› Saving Apple ID password to the local Keychain
  Learn more: https://docs.expo.dev/distribution/security#keychain
✔ Logged in, verify your Apple account to continue
Two-factor Authentication (6 digit code) is enabled for boeck.jana@web.de. Learn more: https://support.apple.com/en-us/HT204915

✔ How do you want to validate your account? … device / sms
✔ Please enter the 6 digit code … 193237
✔ Valid code
✔ Logged in and verified
Authentication with Apple Developer Portal failed!
You have no team associated with your Apple account, cannot proceed.
(Do you have a paid Apple Developer account?)
    Error: build command failed.
MBP-von-Jana:expo-ocr-example Ferdinand$ 