package main

import (
    "fmt"
    "log"
    "html/template"
    "net/http"
)

type ContactDetails struct {
    Name    string
    Email   string
    Subject string
    Message string
}

func main() {
    tmpl, err := template.ParseFiles("contact.html")
    if err != nil {
        log.Fatal("Parse: ", err)
        return
    }

    http.HandleFunc("/contact", func(w http.ResponseWriter, r *http.Request) {
        if r.Method != http.MethodPost {
            tmpl.Execute(w, nil)
            return
        }

        // get form data
        formData := ContactDetails{
            Name:   r.FormValue("name"),
            Email:   r.FormValue("email"),
            Subject: r.FormValue("subject"),
            Message: r.FormValue("message"),
        }

        // do something with the submitted form data
        fmt.Printf("%+v\n", formData)

        // response
        tmpl.Execute(w, struct{ Success bool }{true})
    })

    http.ListenAndServe(":80", nil)
}
