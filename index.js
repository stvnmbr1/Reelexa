/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
var https = require('https');
var http = require('http')

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'Welcome to Reef-Pi!!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  }
};

const GetEquipmentOverviewHandler = {
  canHandle(handlerInput) {
    return (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'GetEquipmentOverviewIntent');
  },
  async handle(handlerInput) {
    let outputSpeech = 'No data received for Equipment Overview.';
    await getRemoteData('https://my-json-server.typicode.com/stvnmbr1/demo/equipment')
      .then((response) => {
        const data = JSON.parse(response);
        outputSpeech = `There are currently ${data.length} pieces of equipment setup. `;
        for (let i = 0; i < data.length; i++) {
          if (i === 0) {
            //first record
            if(data[i].on==true){
            outputSpeech = outputSpeech + data[i].name + ' which is connected to outlet ' + data[i].outlet + ' and enabled ' + ', '
            } else if (data[i].on==false) {
              outputSpeech = outputSpeech + data[i].name + ' which is connected to outlet ' + data[i].outlet + ' and disabled ' + ', '
            }
          } else if (i === data.length - 1) {
            //last record
            if(data[i].on==true){
            outputSpeech = outputSpeech + 'and ' + data[i].name + ' which is connected to outlet ' + data[i].outlet + ' and enabled ' + '.'
            } else if (data[i].on==false) {
              outputSpeech = outputSpeech + 'and ' + data[i].name + ' which is connected to outlet ' + data[i].outlet + ' and disabled ' + '.'
            }
          } else {
            //middle record(s)
            if(data[i].on==true){
            outputSpeech = outputSpeech + data[i].name + ' which is connected to outlet ' + data[i].outlet + ' and enabled' + ', '
            } else if (data[i].on==false) {
              outputSpeech = outputSpeech + data[i].name + ' which is connected to outlet ' + data[i].outlet + ' and disabled'+ ', '
            }
          }
        }
      })
      .catch((err) => {
        //set an optional error message here
        //outputSpeech = err.message;
      });

    return handlerInput.responseBuilder
      .speak(outputSpeech)
      .getResponse();

  },
};

const GetOutletOverviewHandler = {
  canHandle(handlerInput) {
    return (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'GetOutletOverviewIntent');
  },
  async handle(handlerInput) {
    let outputSpeech = 'No data received for Outlet Overview.';

    await getRemoteData('https://my-json-server.typicode.com/stvnmbr1/demo/outlets')
      .then((response) => {
        const data = JSON.parse(response);
        outputSpeech = `There are currently ${data.length} outlets setup. `;
        for (let i = 0; i < data.length; i++) {
          if (i === 0) {
            //first record
            if(data[i].reverse==true){
            outputSpeech = outputSpeech + data[i].name + ' which is connected to pin ' + data[i].pin + ' and reverse enabled ' + ', '
            } else if (data[i].reverse==false) {
              outputSpeech = outputSpeech + data[i].name + ' which is connected to pin ' + data[i].pin + ' and reverse disabled ' + ', '
            }
          } else if (i === data.length - 1) {
            //last record
            if(data[i].reverse==true){
            outputSpeech = outputSpeech + 'and ' + data[i].name + ' which is connected to pin ' + data[i].pin + ' and reverse enabled ' + '.'
            } else if (data[i].reverse==false) {
              outputSpeech = outputSpeech + 'and ' + data[i].name + ' which is connected to pin ' + data[i].pin + ' and reverse disabled ' + '.'
            }
          } else {
            //middle record(s)
            if(data[i].reverse==true){
            outputSpeech = outputSpeech + data[i].name + ' which is connected to pin ' + data[i].pin + ' and reverse enabled' + ', '
            } else if (data[i].reverse==false) {
              outputSpeech = outputSpeech + data[i].name + ' which is connected to pin ' + data[i].pin + ' and reverse disabled'+ ', '
            }
          }
        }
      })
      .catch((err) => {
        //set an optional error message here
        //outputSpeech = err.message;
      });

    return handlerInput.responseBuilder
      .speak(outputSpeech)
      .getResponse();

  },
};

const GetNetworkSettingsHandler = {
  canHandle(handlerInput) {
    return (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'GetNetworkSettingsIntent');
  },
  async handle(handlerInput) {
    let outputSpeech = 'No data received for Network Settings.';

    await getRemoteData('https://my-json-server.typicode.com/stvnmbr1/demo/settings')
      .then((response) => {
        const data = JSON.parse(response);
            //first record
            if(data[0].https==true){
            outputSpeech = data[0].name + ', connected to interface ' + data[0].interface + ' with listen IP address ' + data[0].address + ' and HTTPS enabled.'
            } else if (data[0].https==false) {
            outputSpeech = data[0].name + ', connected to interface ' + data[0].interface + ' with listen IP address ' + data[0].address + ' and HTTPS disabled.'
            }
          })
      .catch((err) => {
        //set an optional error message here
        //outputSpeech = err.message;
      });

    return handlerInput.responseBuilder
      .speak(outputSpeech)
      .getResponse();

  },
};

const GetMacroOverviewHandler = {
  canHandle(handlerInput) {
    return (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'GetMacroOverviewIntent');
  },
  async handle(handlerInput) {
    let outputSpeech = 'No data received for Macro Overview.';

    await getRemoteData('https://my-json-server.typicode.com/stvnmbr1/demo/macros')
      .then((response) => {
        const data = JSON.parse(response);
        outputSpeech = `There are currently ${data.length} macros setup. `;
        for (let i = 0; i < data.length; i++) {
          if (i === 0) {
            //first record
            if(data[i].enable==true){
            outputSpeech = outputSpeech + data[i].name + ' with ' + data[i].steps.length + ' steps, which is enabled, '
            } else if (data[i].enable==false) {
              outputSpeech = outputSpeech + data[i].name + ' with ' + data[i].steps.length + ' steps, which is disabled, '
            }
          } else if (i === data.length - 1) {
            //last record
            if(data[i].reverse==true){
            outputSpeech = outputSpeech + 'and ' + data[i].name + ' with ' + data[i].steps.length + ' steps, which is enabled.'
            } else if (data[i].reverse==false) {
              outputSpeech = outputSpeech + 'and ' + data[i].name + ' with ' + data[i].steps.length + ' steps, which is disabled, '
            }
          } else {
            //middle record(s)
            if(data[i].reverse==true){
            outputSpeech = outputSpeech + data[i].name + ' with ' + data[i].steps.length + ' steps, which is enabled.'
            } else if (data[i].reverse==false) {
              outputSpeech = outputSpeech + data[i].name + ' with ' + data[i].steps.length + ' steps, which is disabled, '
            }
          }
        }
      })
      .catch((err) => {
        //set an optional error message here
        //outputSpeech = err.message;
      });

    return handlerInput.responseBuilder
      .speak(outputSpeech)
      .getResponse();

  },
};

const GetTimerOverviewHandler = {
  canHandle(handlerInput) {
    return (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'GetTimerOverviewIntent');
  },
  async handle(handlerInput) {
    let outputSpeech = 'No data received for Timer Overview.';

    await getRemoteData('https://my-json-server.typicode.com/stvnmbr1/demo/timers')
      .then((response) => {
        const data = JSON.parse(response);
        outputSpeech = `There are currently ${data.length} timers setup. `;
        for (let i = 0; i < data.length; i++) {
          if (i === 0) {
            //first record
            if(data[i].enable==true){
            outputSpeech = outputSpeech + data[i].name + ' which is enabled and controls ' + data[i].type + ' that runs every ' + data[i].day + ' ,rest: ' + data[i].hour + data[i].minute + data[i].second + 'for a duration of ' + data[i].equipment.duration + ' seconds, '
            } else if (data[i].enable==false) {
            outputSpeech = outputSpeech + data[i].name + ' which is disabled and controls ' + data[i].type + ' that runs every ' + data[i].day + ' ,rest: ' + data[i].hour + data[i].minute + data[i].second + 'for a duration of ' + data[i].equipment.duration + ' seconds, '
            }
          } else if (i === data.length - 1) {
            //last record
            if(data[i].enable==true){
            outputSpeech = outputSpeech + data[i].name + ' which is enabled and controls ' + data[i].type + ' that runs every ' + data[i].day + ' ,rest: ' + data[i].hour + data[i].minute + data[i].second + 'for a duration of ' + data[i].equipment.duration + ' seconds. '
            } else if (data[i].enable==false) {
            outputSpeech = outputSpeech + data[i].name + ' which is disabled and controls ' + data[i].type + ' that runs every ' + data[i].day + ' ,rest: ' + data[i].hour + data[i].minute + data[i].second + 'for a duration of ' + data[i].equipment.duration + ' seconds. '
            }
          } else {
            //middle record(s)
            if(data[i].enable==true){
            outputSpeech = outputSpeech + ' and ' + data[i].name + ' which is enabled and controls ' + data[i].type + ' that runs every ' + data[i].day + ' ,rest: ' + data[i].hour + data[i].minute + data[i].second + 'for a duration of ' + data[i].equipment.duration + ' seconds, '
            } else if (data[i].enable==false) {
            outputSpeech = outputSpeech + ' and '+ data[i].name + ' which is disabled and controls ' + data[i].type + ' that runs every ' + data[i].day + ' ,rest: ' + data[i].hour + data[i].minute + data[i].second + 'for a duration of ' + data[i].equipment.duration + ' seconds, '
            }
          }
        }
      })
      .catch((err) => {
        //set an optional error message here
        //outputSpeech = err.message;
      });

    return handlerInput.responseBuilder
      .speak(outputSpeech)
      .getResponse();

  },
};

const GetLoginHandler = {
  canHandle(handlerInput) {
    return (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'GetLoginIntent');
  },
  async handle(handlerInput) {
    let outputSpeech = 'No data received for Timer Overview.';
        const token = await post("/auth/login", { username:"reef-pi", password: "reef-pi" });
        await getRemoteData('https://my-json-server.typicode.com/stvnmbr1/demo/timers',token)
      .then((response) => {
        const data = JSON.parse(response);
        outputSpeech = `There are currently ${data.length} timers setup. `;
        for (let i = 0; i < data.length; i++) {
          if (i === 0) {
            //first record
            if(data[i].enable==true){
            outputSpeech = outputSpeech + data[i].name + ' which is enabled and controls ' + data[i].type + ' that runs every ' + data[i].day + ' ,rest: ' + data[i].hour + data[i].minute + data[i].second + 'for a duration of ' + data[i].equipment.duration + ' seconds, '
            } else if (data[i].enable==false) {
            outputSpeech = outputSpeech + data[i].name + ' which is disabled and controls ' + data[i].type + ' that runs every ' + data[i].day + ' ,rest: ' + data[i].hour + data[i].minute + data[i].second + 'for a duration of ' + data[i].equipment.duration + ' seconds, '
            }
          } else if (i === data.length - 1) {
            //last record
            if(data[i].enable==true){
            outputSpeech = outputSpeech + data[i].name + ' which is enabled and controls ' + data[i].type + ' that runs every ' + data[i].day + ' ,rest: ' + data[i].hour + data[i].minute + data[i].second + 'for a duration of ' + data[i].equipment.duration + ' seconds. '
            } else if (data[i].enable==false) {
            outputSpeech = outputSpeech + data[i].name + ' which is disabled and controls ' + data[i].type + ' that runs every ' + data[i].day + ' ,rest: ' + data[i].hour + data[i].minute + data[i].second + 'for a duration of ' + data[i].equipment.duration + ' seconds. '
            }
          } else {
            //middle record(s)
            if(data[i].enable==true){
            outputSpeech = outputSpeech + ' and ' + data[i].name + ' which is enabled and controls ' + data[i].type + ' that runs every ' + data[i].day + ' ,rest: ' + data[i].hour + data[i].minute + data[i].second + 'for a duration of ' + data[i].equipment.duration + ' seconds, '
            } else if (data[i].enable==false) {
            outputSpeech = outputSpeech + ' and '+ data[i].name + ' which is disabled and controls ' + data[i].type + ' that runs every ' + data[i].day + ' ,rest: ' + data[i].hour + data[i].minute + data[i].second + 'for a duration of ' + data[i].equipment.duration + ' seconds, '
            }
          }
        }
      })
      .catch((err) => {
        //set an optional error message here
        //outputSpeech = err.message;
      });

    return handlerInput.responseBuilder
      .speak(outputSpeech)
      .getResponse();

  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can telling me your name';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const HelloWorldIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
  },
  handle(handlerInput) {
    const speechText = 'Hello World!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  }
};

const defaultOptions = {
    host: '78.23.233.208',
    path: '/auth/api',
    port: 8800, // or 443 for https
    headers: {
        'Content-Type': 'application/json',
    }
}

const post = (path, payload) => new Promise((resolve, reject) => {
    const options = { ...defaultOptions, method: 'POST' };
    const req = http.request(options, res => {
        let buffer = "";
        res.on('data', chunk => buffer += chunk)
        res.on('end', () => resolve(JSON.parse(buffer)))
    });
    req.on('error', e => reject(e.message));
    req.write(JSON.stringify(payload));
    req.end();
})

const getRemoteData = function (url, token) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? require('https') : require('http');
    const request = client.get(url, token, (response) => {
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error('Failed with status code: ' + response.statusCode));
      }
      const body = [];
      response.on('data', (chunk) => body.push(chunk));
      response.on('end', () => resolve(body.join('')));
    });
    request.on('error', (err) => reject(err))
  })
};





const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    GetLoginHandler,
  
    GetEquipmentOverviewHandler,
    GetOutletOverviewHandler,
    GetNetworkSettingsHandler,
    GetTimerOverviewHandler,
    GetMacroOverviewHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
