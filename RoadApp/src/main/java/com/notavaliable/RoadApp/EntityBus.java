package com.notavaliable.RoadApp;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "buses")
public class EntityBus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long num;
    @ManyToMany
    private List<EntityLocation> destinations;

    public EntityBus(){}
    public EntityBus(Long no,List<EntityLocation> d){
        this.num = no;
        this.destinations = d;
    }
    public Long getNum(){
        return num;
    }
    public List<EntityLocation> getDestinations(){
        return destinations;
    }
    public void setDestinations(List<EntityLocation> stops){
        this.destinations = stops;
    }
    public Long getId(){return id;}
    public void  setId(Long id){this.id = id;}
    public void setNum(Long num){this.num = num;}
    public String toString(){
        StringBuilder temp = new StringBuilder();
        for (EntityLocation t : destinations){
            temp.append(t.getName()).append(" ");
        }
        String f = "Bus : %d[destinations : %s]";
        return String.format(f,num,temp.toString());
    }

}
