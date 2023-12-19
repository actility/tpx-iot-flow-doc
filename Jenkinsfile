pipeline {
    options {
      gitLabConnection('Git corporate')
      disableConcurrentBuilds()
      buildDiscarder(logRotator(numToKeepStr: '5'))
    }
    agent {
        label 'ec2.focal.medium'
    }
    tools {
       nodejs "Nodejs_20"
    }
    environment {
          SRC = "${env.WORKSPACE}"
          TARGET_PATH="${SRC}/target"
    }
    stages{
        stage('Install') {
          steps {
            nodejs(nodeJSInstallationName: 'Nodejs_20', configId: 'npm-config-9-plus') {
                sh 'npm ci'
            }
          }
        }
        stage('Build') {
          steps {
            nodejs(nodeJSInstallationName: 'Nodejs_20', configId: 'npm-config-9-plus') {
                sh 'npm run build'
            }
          }
        }
        stage('Package') {
          steps {
            nodejs(nodeJSInstallationName: 'Nodejs_20', configId: 'npm-config-9-plus') {
                sh 'bash package-archive.sh'
            }
          }
        }
        stage('Deploy') {
          steps {
            dir("${TARGET_PATH}") {
               rtUpload (
                 serverId: 'Artifactory',
                 spec: '''{
                   "files": [
                     {
                       "pattern": "tpx-iot-flow-public-documentation.tgz",
                       "regexp": "null",
                       "target": "tarball/tpx/iot-flow/tpx-iot-flow-public-documentation/",
                       "props": "type=tgz;status=ready"
                     }
                   ]
                 }'''
               )

            }
          }
        }
    }
    post {
        failure {
          updateGitlabCommitStatus name: 'Jenkins', state: 'failed'
        }
        success {
          updateGitlabCommitStatus name: 'Jenkins', state: 'success'
        }
    }

}
