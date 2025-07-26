pipeline {
    agent any

    tools {
        nodejs 'node' // Optional: Only if you've configured it in Jenkins > Global Tool Configuration
    }

    environment {
        PATH = "${tool 'node'}/bin:${env.PATH}" // Optional: helps Jenkins find npm/node
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Abhishek6585/Real_Time_Chat.git'
            }
        }

        stage('Install') {
            steps {
                bat 'npm install'
            }
        }

        stage('Lint/Test') {
            steps {
                bat 'npm run lint'
                bat 'npm test'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }
    }

    post {
        failure {
            echo '❌ Pipeline failed. Check error messages above.'
        }
        success {
            echo '✅ Build, Test & Install successful!'
        }
    }
}
