pipeline {
    agent any

    stages {
        stage('Installing dependencies') {
            steps {
                echo 'Building..'
                sh 'npm install'
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
        stage('Building docker image') {
            when {
              expression {
                currentBuild.result == null || currentBuild.result == 'SUCCESS' 
              }
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'Docker', passwordVariable: 'dockerpassword', usernameVariable: 'dockerusername')]) {
                    echo 'Building docker image..'
                    echo '${env}'
                    sh 'cat dockerpassword.txt | docker login --usermane=${dockerusername} --password-stdin'
                    sh 'docker build - < Dockerfile'
                    sh 'docker image ls'
                    sh 'docker push bambby/pizzadelicious:jenkins'
                }
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