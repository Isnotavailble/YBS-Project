package com.notavaliable.RoadApp;

import jakarta.persistence.*;

@Entity
@Table(name = "locations")
public class EntityLocation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Double longitude;
    private Double latitude;

    public EntityLocation(){}
    public EntityLocation(Double lat , Double lon,String name){
        this.latitude = lat;
        this.longitude = lon;
        this.name = name;
    }
    public Long getId(){return id;}
    public double getLongitude(){
        return longitude;
    }
    public double getLatitude(){
        return latitude;
    }
    public String getName() {return name;}
    public void setName(String name){this.name = name;}
    public void setLongitude(Double longitude){this.longitude = longitude;}
    public void setLatitude(Double latitude){this.latitude = latitude;}

    @Override
    public String toString(){
        String f = "Location %s [%f,%f]";
        return String.format(f,name,latitude,longitude);
    }


}
