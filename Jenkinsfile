pipeline {
    agent any

    stages {
        stage('Installing dependencies') {
            steps {
                echo 'Building..'
                sh 'sudo npm install'
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
                sh 'sudo npm test'
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
                    sh 'sudo cat dockerpassword.txt | sudo docker login --username=${dockerusername} --password-stdin'
                }
            }
        }
        stage('Removing unused docker images') {
            when {
              expression {
                currentBuild.result == null || currentBuild.result == 'SUCCESS' 
              }
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'Docker', passwordVariable: 'dockerpassword', usernameVariable: 'dockerusername')]) {
                    sh 'sudo docker images -f dangling=true'
                    sh 'yes | sudo docker image prune'
                }
            }
        }
        stage('Building new docker image') {
            when {
              expression {
                currentBuild.result == null || currentBuild.result == 'SUCCESS' 
              }
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'Docker', passwordVariable: 'dockerpassword', usernameVariable: 'dockerusername')]) {
                    sh 'sudo docker build . -t bambby/pizzadelicious'
                    sh 'sudo docker images'
                }
            }
        }
        stage('Pushing to docker repo') {
            when {
              expression {
                currentBuild.result == null || currentBuild.result == 'SUCCESS' 
              }
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'Docker', passwordVariable: 'dockerpassword', usernameVariable: 'dockerusername')]) {
                    sh 'sudo docker push bambby/pizzadelicious:latest'
                }
            }
        }
        // stage('Login in into heroku') {
        //     when {
        //       expression {
        //         currentBuild.result == null || currentBuild.result == 'SUCCESS' 
        //       }
        //     }
        //     steps {
        //         withCredentials([sshUserPrivateKey(credentialsId: '6c92d9fa-3d44-49e6-9d40-55439226aa55', keyFileVariable: 'SSH')]) {
        //             // sh 'yes "john.alabi@smartsafeuk.com" "horLARmiDE44(+++)" | heroku login --interactive'
        //             sh 'heroku login' 
        //         }
        //     }
        // }
        // stage('Deploy to heroku') {
        //     when {
        //       expression {
        //         currentBuild.result == null || currentBuild.result == 'SUCCESS' 
        //       }
        //     }
        //     steps {
        //         withCredentials([sshUserPrivateKey(credentialsId: '6c92d9fa-3d44-49e6-9d40-55439226aa55', keyFileVariable: 'SSH')]) {
        //             echo 'Deploying....'
        //             sh 'git push publish main'
        //         }
        //     }
        // }
    }
}