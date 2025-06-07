package com.notavaliable.RoadApp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BusRepo extends JpaRepository<EntityBus,Long> {
List<EntityBus> findByDestinations(EntityLocation stopName);
Optional<EntityBus> findByNum(Integer num);
}
