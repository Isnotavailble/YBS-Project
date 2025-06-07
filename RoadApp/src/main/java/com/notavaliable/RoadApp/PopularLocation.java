package com.notavaliable.RoadApp;

import jakarta.persistence.*;
import org.jetbrains.annotations.NotNull;

@Entity
@Table(name = "popular_locations")
public class PopularLocation {
    @Id
    private Long id;
    private String name;
    @OneToOne
    @MapsId
    private EntityLocation location;
    public  PopularLocation(@NotNull EntityLocation l){
        this.location = l;
        this.name = l.getName();
    }
    public String getName(){
        return name;
    }
    public PopularLocation(){}
    public EntityLocation getLocation() {
        return location;
    }

    public void setLocation(EntityLocation location) {
        this.location = location;
    }
    @Override
    public String toString(){
        return "Popular Location : " + location.getName();
    }
}
