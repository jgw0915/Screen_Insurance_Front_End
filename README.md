# Screen Insurance Front End

This is the FronEnd Project for Screen Insurance Detection. 

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (recommended version 18 or newer)
- Java Development Kit (JDK) 17
- Android Studio
- Android SDK with the following components:
  - Build Tools 35.0.0
  - Android SDK Platform 35
  - Android NDK 26.1.10909125

## Environment Setup

1. Install Android Studio
2. Configure Android SDK (via Android Studio):
   - Android SDK Platform 35
   - Android SDK Build-Tools 35.0.0
   - Android NDK 26.1.10909125

3. Set up environment variables:
   ```bash
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jgw0915/Screen_Insurance_Front_End.git
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## Running the Project

1. Start Metro Bundler:
   ```bash
   npm start
   # or
   yarn start
   ```

2. Run on Android:
   ```bash
   npm run android
   # or
   yarn android
   ```

### Running on a Device

1. Enable USB debugging on your Android device
2. Connect your device via USB
3. Run `adb devices` to verify your device is connected
4. Run the project using the commands above

### Running on an Emulator

1. Open Android Studio
2. Open AVD Manager and create/start an Android Virtual Device
3. Run the project using the commands above

## Troubleshooting

Common issues and their solutions:

- If you encounter build errors, try:
  ```bash
  cd android
  ./gradlew clean
  ```

- For "SDK location not found" error:
  Create a `local.properties` file in the `android` folder with:
  ```
  sdk.dir=/path/to/your/Android/sdk
  ```
- For Building Error in Android:
  ```
  Could not determine the dependencies of task ':react-native-imei:bundleLibCompileToJarDebug'.
  > Could not create task ':react-native-imei:compileDebugJavaWithJavac'.
     > In order to compile Java 9+ source, please set compileSdkVersion to 30 or above
  ```
  Modify the sdk version in ./node_modules/react-native-imei/adnroid/gradle.build to above 30.
## Minimum Requirements

- Android SDK: API 24 (Android 7.0)
- Target SDK: API 34 (Android 14)
- Build Tools: 35.0.0

## Additional Information

For more detailed information about React Native setup and troubleshooting, visit:
[React Native Documentation](https://reactnative.dev/docs/environment-setup)
