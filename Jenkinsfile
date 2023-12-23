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
                sh 'docker buildx build \
                    --tag $JOB_NAME:latest \
                    --platform linux/amd64 \
                    --cache-to type=local,dest=/tmp/.buildx-cache/$JOB_NAME \
                    --output type=docker .'
            }
        }
        stage('Deploy') {
            steps {
                script {
                    try {
                        sh 'docker stop $JOB_NAME'
                        sh 'docker rm $JOB_NAME'
                    } catch (Exception e) {
                        echo 'Container not found'
                    } finally {
                        if (env.JOB_NAME == "presso.codes") {
                            sh 'docker run \
                                -d \
                                --name $JOB_NAME \
                                --restart unless-stopped \
                                --network custom_network \
                                --ip 172.18.0.4 \
                                --volume /etc/localtime:/etc/localtime:ro \
                                --volume /etc/timezone:/etc/timezone:ro \
                                 $JOB_NAME:latest'
                        } else if (env.JOB_NAME == 'dev.presso.codes') {
                            sh 'docker run \
                                -d \
                                --name $JOB_NAME \
                                --restart unless-stopped \
                                --network custom_network \
                                --ip 172.18.0.5 \
                                --volume /etc/localtime:/etc/localtime:ro \
                                --volume /etc/timezone:/etc/timezone:ro \
                                 $JOB_NAME:latest'
                        }
                    }
                }
            }
        }
    }

//     post {
//         success {
//             slackSend (channel: "#빌드-로그", color: "good", message: "${env.JOB_NAME} Build successful\n`${env.JOB_NAME}#${env.BUILD_NUMBER}` \n<${env.BUILD_URL}|Open in Jenkins>")
//         }
//         failure {
//             slackSend (channel: "#빌드-로그", color: "#FF0000", message: "${env.JOB_NAME} Build failed\n`${env.JOB_NAME}#${env.BUILD_NUMBER}` \n<${env.BUILD_URL}|Open in Jenkins>")
//         }
//     }
}
