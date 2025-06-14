package com.notavaliable.RoadApp;

import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.atomic.AtomicBoolean;


@RestController
@RequestMapping("api")
public class LocationController {
    @Autowired
    private LocationRepo repo;
    @Autowired
    private BusRepo bus;
    @Autowired
    private PopularLocationRepo popRepo;

    public boolean findDuplicate(EntityBus entry_bus,EntityLocation entry_stop){
        if (entry_bus != null) {
            AtomicBoolean trigger = new AtomicBoolean(false);
            bus.findAll().forEach(b -> {
                if(b.getNum().equals(entry_bus.getNum())){
                    trigger.set(true);
                }
            });
            return trigger.get();

        }
        if(entry_stop != null){
            AtomicBoolean t = new AtomicBoolean(false);
            repo.findAll().forEach(s -> {
                if (s.getName().equalsIgnoreCase(entry_stop.getName())){
                    t.set(true);
                }
            });
            return t.get();
        }

        return false;
    }

    @PostMapping("/admin/upStop")
    public ResponseEntity<EntityLocation> getStop(@RequestBody EntityLocation stop){
        if(!findDuplicate(null,stop)){
            System.out.println("Data up");
            repo.save(stop);
            return ResponseEntity.ok().build();
        }
        else {
            System.out.println("duplicated data : " + stop.getName());
            return ResponseEntity.badRequest().build();}
    }

    //get bus Stop
    @GetMapping("admin/getStop")
    public ResponseEntity<?> getStop(@RequestParam String stop){
        List<EntityLocation> entry_stop_partial = repo.findByNameContaining(stop);//partial matches
        //no longer needed if data is removed zero width bit
        //List<EntityLocation> entry_stop_full = repo.findByName(stop);
        
        if(!entry_stop_partial.isEmpty()){
            List<ResponseForBusStop> responseList = new ArrayList<>();
            entry_stop_partial.forEach(foundedStop -> {
                List<EntityBus> relatedBus = bus.findByDestinations(foundedStop);
                ResponseForBusStop response = new ResponseForBusStop(relatedBus,foundedStop);
                responseList.add(response);
            });
            System.out.println( "response : " +  responseList.size() + "list : " + entry_stop_partial.size() );
            return ResponseEntity.ok(responseList);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new CustomResponse("Related BusLine not founded for " + stop)
        );
    }
    //get all stop
    @GetMapping("admin/getAllStop")
    public List<EntityLocation> getAllStop(){
        return repo.findAll();
    }

    @DeleteMapping("/admin/deleteLocation/{id}")
    public ResponseEntity<String> deleteLocation(@PathVariable Long id) {
        boolean t = false;
        if (repo.findById(id).isPresent()) {
            repo.deleteById(id);
            return ResponseEntity.ok("Deleted " + id);
        }
        return ResponseEntity.notFound().build();
    }
    //get Bus Line
    @GetMapping("/admin/getBus/{id}")
    public String getBusInfo(@PathVariable Long id) {
        Optional<EntityBus> b = bus.findById(id);
        if (b.isPresent()) {
            EntityBus temp = b.get();
            return temp.getNum().toString() + temp.getDestinations().toString();
        }
        return "not exist";
    }
    //Can return freedom(all datatype in body)
    //update -- clean up code
    @GetMapping("/admin/getBusNum/{num}")
    public ResponseEntity<?> getBusNum(@PathVariable Long num) {
        Optional<EntityBus> entry_bus = bus.findByNum(num);
        if(entry_bus.isPresent()){
            return ResponseEntity.ok(entry_bus.get());
        }
        CustomResponse res = new CustomResponse("Not Found");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
    }

    @GetMapping("/admin/getAllBus")
    public List<EntityBus> getAllBus(){
        return bus.findAll();
    }
    //upload Bus line number(updated)
    //new-- can upload bus line's destinations to locations table with points
    //no need upStop entry point
    @PostMapping("admin/upBus")
    public ResponseEntity<EntityBus> upBus(@NotNull @RequestBody EntityBus bus_e){

            System.out.println("Up" + bus_e.getNum());
            List<EntityLocation> linkedStop = new ArrayList<>();
            for(EntityLocation stop : bus_e.getDestinations()){
                Optional<EntityLocation> existing = repo.findByNameAndLatitudeAndLongitude
                        (stop.getName(),stop.getLatitude(),stop.getLongitude());
                if (existing.isPresent()){
                    System.out.println("found : " + stop.toString());
                    linkedStop.add(existing.get());
                }
                else{
                    System.out.println("Saved : " + stop.toString());
                    linkedStop.add(repo.save(stop));
                }
            }
            bus_e.setDestinations(linkedStop);
            bus.save(bus_e);
            System.out.println("success : " + bus_e.getDestinations());
            return ResponseEntity.ok().build();

    }
    //upload pop-locations
    @PostMapping("admin/uploadPopLocation")
    public ResponseEntity<?> uploadPopLocation(@RequestBody Long stop_id){
        Optional<EntityLocation> existing = repo.findById(stop_id);
        Optional<PopularLocation> existing_pop = popRepo.findById(stop_id);
        if(existing.isPresent() && existing_pop.isEmpty()){
            popRepo.save(new PopularLocation(existing.get()));
            System.out.println("saved : " + existing.get().toString());
            return ResponseEntity.status(HttpStatus.OK).body(new CustomResponse("Successfully uploaded"));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new CustomResponse("Failed"));
    }
    @GetMapping("admin/getPopularLocation")
    public ResponseEntity<?> getPopLocation(@RequestParam String stop_name){
        Optional<PopularLocation> l = popRepo.findByLocationName(stop_name);
        if(l.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(l.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new CustomResponse("not ok"));
    }
    @GetMapping("admin/getAllPopularLocations")
    public List<PopularLocation> getAllPopLocations(){
        return popRepo.findAll();
    }


    //just in case if wrong data uploaded about bus number
    @PutMapping("admin/updateBus/{id}/{num}")
    public ResponseEntity<String> updateBus(@PathVariable Long id,@PathVariable Long num){
        Optional<EntityBus> existing = bus.findById(id);
        if(existing.isPresent()){
            EntityBus e_bus = existing.get();
            e_bus.setNum(num);
            bus.save(e_bus);
        }
        return ResponseEntity.ok("Updated");
    }

}

