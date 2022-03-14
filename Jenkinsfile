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
        stage('Signing in to docker') {
            when {
              expression {
                currentBuild.result == null || currentBuild.result == 'SUCCESS' 
              }
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'Docker', passwordVariable: 'dockerpassword', usernameVariable: 'dockerusername')]) {
                    
                    sh 'echo horLARmiDE44 > dockerpassword.txt'
                    sh 'cat dockerpassword.txt | docker login --username=${dockerusername} --password-stdin'
                }
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
                    sh 'docker build -t pizzadelicious'
                    sh 'docker images'
                    sh 'docker push bambby/pizzadelicious:pizzadelicious'
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