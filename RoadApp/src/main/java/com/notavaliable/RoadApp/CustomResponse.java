package com.notavaliable.RoadApp;

public class CustomResponse {
    private String message;
    public  CustomResponse(String ms){
        this.message = ms;
    }
    public String getMessage(){
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
}
