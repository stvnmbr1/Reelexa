# Reelexa
Relaxed reefing with IOT and Reef-Pi

How it started:
Creating an Alexa skill for reef-pi

Be able to ask alexa for latest stats from reef-pi equipment, in a later state be able to activate macros like feeding time, cleaning time, ...

I will start with the ability to retrieve stats first, in a later stage controlling macros/equipment and try to cover the entire API.

No tutorial or guide available yet as these are the first baby steps.

now:
As of now the skill is an alexa hosted skill that only requires amazon alexa developer account (free!)
MQTT Broker needs to be accessable through internet with proper auth.


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
- Temperature - Current/avg
- ATO usage - current / avg

(Testing):
- Capabilites -(trouble with response json values with Alexa)

(Planned):
- Temperature - ?night time/day time?
- ATO usage - last run ?night time/day time?


Control:

(Working):
- macro(s) - Feeding (Fixed macro naming)
           - Water Change (In testing, Fixed macro naming)
           - Maintenance (Fixed macro naming)
           - Every other macro setup (without spaces in name, still fixing this)

(Testing):


(Planned):


In Progress:

- Change to MQTT broker
- Get metrics with prometheus integration and more (mostly done)
- openHAB dashboard controller

Other planned:
- ifttt integration
- hue integration
