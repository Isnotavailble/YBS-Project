package com.notavaliable.RoadApp;
//
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.util.ArrayList;
//import java.util.List;
//@Configuration
//public class preLoad {
//    @Bean
//    public CommandLineRunner load (BusRepo rp){
//        return args -> {
//            List<String> t = new ArrayList<>();
//            t.add("Hla dan");
//            t.add("Shwe pe thar");
//            rp.save(new EntityBus(131, t ));
//            System.out.println("Data successfully loaded");
//        };
//    }
//}
import org.jetbrains.annotations.NotNull;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class preLoad {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@NotNull CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://127.0.0.1:5500","http://localhost:5173") // <-- your JS frontend port
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
