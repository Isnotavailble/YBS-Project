package com.notavaliable.RoadApp;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PopularLocationRepo extends JpaRepository<PopularLocation,Long> {
    Optional<PopularLocation> findByLocationName(String name);
}
