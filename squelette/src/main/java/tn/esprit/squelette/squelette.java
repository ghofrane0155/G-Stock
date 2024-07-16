package tn.esprit.squelette;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class squelette {

    public static void main(String[] args) {
        SpringApplication.run(squelette.class, args);
    }

}
