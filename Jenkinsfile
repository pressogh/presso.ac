pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh 'docker build --platform linux/arm64 -t $USERNAME/$JOB_NAME:latest .'
                }
            }
        }
        stage('Push Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh 'docker login -u $USERNAME -p $PASSWORD'
                    sh 'docker push $USERNAME/$JOB_NAME:latest'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        sh 'docker pull $USERNAME/$JOB_NAME:latest'
                        try {
                            sh 'docker stop $JOB_NAME'
                            sh 'docker rm $JOB_NAME'
                        } catch (Exception e) {
                            echo 'Container not found'
                        }
                        sh 'docker run -d \
                            --name $JOB_NAME \
                            --restart unless-stopped \
                            -e "TZ=Asia/Seoul" \
                            --network app_custom_network \
                            --ip 172.19.0.4 \
                            $USERNAME/$JOB_NAME:latest'
                    }
                }
            }
        }
    }

    post {
        success {
            slackSend (channel: "#빌드-로그", color: "good", message: "${env.JOB_NAME} Build successful\n`${env.JOB_NAME}#${env.BUILD_NUMBER}` \n<${env.BUILD_URL}|Open in Jenkins>")
        }
        failure {
            slackSend (channel: "#빌드-로그", color: "#FF0000", message: "${env.JOB_NAME} Build failed\n`${env.JOB_NAME}#${env.BUILD_NUMBER}` \n<${env.BUILD_URL}|Open in Jenkins>")
        }
    }
}
