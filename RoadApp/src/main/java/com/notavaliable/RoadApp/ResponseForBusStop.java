package com.notavaliable.RoadApp;

import java.util.List;

public class ResponseForBusStop {
    private List<EntityBus> bus;
    private EntityLocation location;
    public ResponseForBusStop(List<EntityBus> bus, EntityLocation location){
        this.bus = bus;
        this.location = location;
    }
    public ResponseForBusStop(){}
    public void setBus(List<EntityBus> bus){
        this.bus = bus;
    }
    public  void  setLocation(EntityLocation location){
        this.location = location;
    }
    public EntityLocation getLocation(){
        return location;
    }
    public List<EntityBus> getBus(){
        return bus;
    }

    @Override
    public String toString() {
        return "bus : " + bus + "location : " + location;
    }
}
