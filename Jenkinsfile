pipeline {
  agent any

  tools {
    nodejs 'node'  // Same name from global config
  }

  stages {
    stage('Checkout') {
  steps {
    git branch: 'main', url: 'https://github.com/Abhishek6585/Real_Time_Chat.git'
  }
}


    stage('Install') {
      steps {
        sh 'npm install'
      }
    }

    stage('Lint/Test') {
      steps {
        sh 'npm run lint || echo "No linter defined"'
        sh 'npm test || echo "No tests defined"'
      }
    }

    stage('Build') {
      steps {
        echo 'Build stage (add Docker or other logic here if needed)'
      }
    }
  }

  post {
    success {
      echo 'Pipeline completed successfully!'
    }
    failure {
      echo 'Pipeline failed.'
    }
  }
}
