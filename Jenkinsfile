pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'npm install'
                // archiveArtifacts artifacts: 'report/buildreport.jar', fingerprint: true
            }
        }
        stage('Test') {
            when {
              expression {
                currentBuild.result == null || currentBuild.result == 'SUCCESS' 
              }
            }
            steps {
                echo 'Testing..'
                sh 'npm test'
                junit 'junit.xml'
            }
        }
        stage('Build docker image') {
            when {
              expression {
                currentBuild.result == null || currentBuild.result == 'SUCCESS' 
              }
            }
            steps {
                echo 'Building docker image..'
                sh 'docker build -t pizzadelicious ${env.WORKSPACE}'
                sh 'docker image ls'
            }
        }
        stage('Deploy') {
            when {
              expression {
                currentBuild.result == null || currentBuild.result == 'SUCCESS' 
              }
            }
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: '6c92d9fa-3d44-49e6-9d40-55439226aa55', keyFileVariable: 'SSH')]) {
                    echo 'Deploying....'
                    sh 'git push publish HEAD:main'
                }
            }
        }
    }
}