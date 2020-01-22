package main

import (
        "crypto/tls"
        mqtt "github.com/eclipse/paho.mqtt.golang"
        "fmt"
        "os"
        "os/signal"
        "syscall"
        "github.com/levigross/grequests"
)

func onMessageReceived(client mqtt.Client, message mqtt.Message) {
        fmt.Printf("Received message on topic: %s\nMessage: %s\n", message.Topic(), message.Payload())
var logincookie = "insertcookiehere"

msgStr := fmt.Sprintf ("%s", message.Payload())
fmt.Println(msgStr)
apiurl := fmt.Sprintf ("http://192.168.0.160:85/%s",msgStr)
fmt.Println(apiurl)

ro := &grequests.RequestOptions{Headers: map[string]string{"Cookie": logincookie}}
resp, err := grequests.Get(apiurl, ro)
// Not the usual JSON so copy and paste from below

if err != nil {
    fmt.Println("Unable to make request", err)
}

if resp.Ok != true {
    fmt.Println("Request did not return OK")
}

fmt.Println(resp)

respStr := resp.String()
fmt.Println(respStr)
  if token := client.Publish("reefpi/out", 0, false, respStr); token.Wait() && token.Error() != nil {
        fmt.Println(token.Error())
        fmt.Println("error on pub")
  } else {
         fmt.Printf("pubd")
  }

}

func main () {

c := make(chan os.Signal, 1)
signal.Notify(c, os.Interrupt, syscall.SIGTERM)

 var server=   "tcp://127.0.0.1:1883" // "The full URL of the MQTT server to connect to
 var username= "test"                     // A username to authenticate to the MQTT server
 var password= "test"                     //Password to match username
 var clientid= "reef-pi.local"


 connOpts := mqtt.NewClientOptions().AddBroker(server).SetClientID(clientid).SetCleanSession(true)
 if username != "" {
        connOpts.SetUsername(username)
        if password != "" {
                connOpts.SetPassword(password)
        }
 }
 tlsConfig := &tls.Config{InsecureSkipVerify: true, ClientAuth: tls.NoClientCert}
 connOpts.SetTLSConfig(tlsConfig)

 connOpts.OnConnect = func(c mqtt.Client) {
 if token := c.Subscribe("reefpi/in", 0, onMessageReceived); token.Wait() && token.Error() != nil {
        fmt.Println(token.Error())
        fmt.Println("error on sub")
 } else {
         fmt.Printf("subscribed")
 }
 }

  client := mqtt.NewClient(connOpts)
 if token := client.Connect(); token.Wait() && token.Error() != nil {
         panic(token.Error())
 } else {
         fmt.Printf("Connected to %s\n", server)
 }
 <-c

fmt.Println("done")

}
