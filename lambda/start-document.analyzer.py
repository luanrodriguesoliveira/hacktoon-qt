import json
import boto3

def lambda_handler(event, context):
    sf = boto3.client('stepfunctions', region_name = 'us-east-1')
    input_dict = event
    response = sf.start_execution(stateMachineArn = 'arn:aws:states:us-east-1:711034367805:stateMachine:MyStateMachine',input = json.dumps(input_dict))
  
    return {
        "statusCode": 200,
         "headers": {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        "body": json.dumps(input_dict)
    }
    
