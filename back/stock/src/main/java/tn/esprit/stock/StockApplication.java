package tn.esprit.stock;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import tn.esprit.stock.repository.IRoleRepository;
import tn.esprit.stock.entities.Role;

@SpringBootApplication
@EnableJpaAuditing
@EnableAsync
public class StockApplication {

	public static void main(String[] args) {
		SpringApplication.run(StockApplication.class, args);
	}

	@Bean
	public CommandLineRunner runner(IRoleRepository roleRepository) {
		return args -> {
			if (roleRepository.findByName("USER").isEmpty()) {
				roleRepository.save(Role.builder().name("USER").build());
			}
		};
	}
}
