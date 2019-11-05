# Reelexa
Relaxed reefing with IOT and Reef-Pi

Creating an Alexa skill for reef-pi

Be able to ask alexa for latest stats from reef-pi equipment, in a later state be able to activate macros like feeding time, cleaning time, ...

I will start with the ability to retrieve stats first, in a later stage controlling macros/equipment and try to cover the entire API.

As of now the skill is hosted in an AWS Lambda instance, which requires amazon & AWS developer accounts(and CC credentials).
In a later stage I would like to host the Lambda instance on reef-pi to handle requests (easing end-user setup as no additional AWS lambda setup would be needed, but this ends up eating resources so other options have been kept in mind.

API needs to be accessable through internet with an alexa hosted skill, Local webserver needs to be accessable through internet with a local hosted Lambda instance and meet requirements.

No tutorial or guide available yet as these are the first baby steps.


Currently available capabilities:

Get/Return :

(Working):
- Equipment Overview - returns: name,connected pin, state
- Inlet Overview -
- Analog inputs Overview -
- Outlet Overview - returns: name,connected pin, state
- Dosing Pump Overview -
- Macro Overview - returns: name,step count, state
- Timer Overview - returns: name,still need to figure out the *-parts
- Network Settings - returns: dns name, listen interface, listen ip, https state

(Testing):
- Capabilites -(trouble with response json values)

(Planned):
Temperature - Current/avg 24hr/avg 7 days ?night time/day time?
ATO usage - current / last run / avg 24hr/avg 7 days ?night time/day time?


Control:

(Working):
- macro(s) - Feeding (Fixed macro naming)
           - Water Change (In testing, Fixed macro naming)
           - Maintenance (Fixed macro naming)
           - Every other macro setup (without spaces in name, still fixing this)

(Testing):


(Planned):


In Progress:

Change to MQTT broker



Other planned:
-Get metrics with prometheus integration and more

Additional context

API will need to be accessable externally - Looking for secure way to traffic HTTP POST and GET data over internet - current https connection from reef-pi should suffice

Any input on what you would like Alexa to be able to do is welcome.
