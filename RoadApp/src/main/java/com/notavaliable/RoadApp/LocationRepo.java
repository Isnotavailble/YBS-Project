package com.notavaliable.RoadApp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.List;
import java.util.Optional;
@EnableJpaRepositories
public interface LocationRepo extends JpaRepository<EntityLocation,Long> {
    List<EntityLocation> findByName(String name);
    List<EntityLocation> findByNameContaining(String name);
    Optional<EntityLocation> findByNameAndLatitudeAndLongitude(String name, Double latitude , Double longitude);
}
