import requests
import json

url = "http://localhost:20002/api/helloworld"

querystring = {"name":"Patrick"}

payload = "{ \"name\": \"Patrick Payne\" }"
headers = {
    'Content-Type': "application/json",
    'Cache-Control': "no-cache",
    'Postman-Token': "cd3aa676-a029-43ac-877f-f164f5ec46f3"
    }

response = requests.request("POST", url, data=payload, headers=headers, params=querystring)

print(response.text)

jsondata = json.loads(response.content)

print(jsondata['message'])

