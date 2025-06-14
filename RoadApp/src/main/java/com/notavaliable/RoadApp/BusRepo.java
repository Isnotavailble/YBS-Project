package com.notavaliable.RoadApp;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BusRepo extends JpaRepository<EntityBus,Long> {
List<EntityBus> findByDestinations(EntityLocation stopName);
Optional<EntityBus> findByNum(Long num);
}
