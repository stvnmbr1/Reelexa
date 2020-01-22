run := '1'
for run == '1'{

ro := &grequests.RequestOptions{Headers: map[string]string{"Cookie": logincookie, "Connection" : "keep-alive"}}
resp, err := grequests.Get("http://192.168.0.160:85/api/macros", ro)
if err != nil {
    fmt.Println("Unable to make request", err)
}
if resp.Ok != true {
    fmt.Println("Request did not return OK")
}
fmt.Println(resp)
respStr := resp.String()
fmt.Println(respStr)
  if token := c.Publish("reefpi/macros", 0, false, respStr); token.Wait() && token.Error() != nil {
        fmt.Println(token.Error())
        fmt.Println("error on pub")
  } else {
         fmt.Printf("pubd")
         time.Sleep(1 * time.Second)
  }
 }

}

