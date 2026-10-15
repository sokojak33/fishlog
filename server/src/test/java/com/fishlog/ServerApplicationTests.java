package com.fishlog;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

import com.fishlog.model.FishCatch;
import com.fishlog.repository.CatchRepository;

import org.springframework.http.MediaType;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ServerApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private CatchRepository catchRepository;

	@BeforeEach
	void clearDatabase() {
		catchRepository.deleteAll();
	}

	@Test
	void shouldCreateAndPersistCatch() throws Exception {
		String newCatch = """
				{
				    "species": "Largemouth Bass",
				    "location": "Pewaukee Lake",
				    "date": "2026-09-29",
				    "length": 18.5
				}
				""";

		mockMvc.perform(post("/api/catches")
				.contentType(MediaType.APPLICATION_JSON)
				.content(newCatch))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").exists())
				.andExpect(jsonPath("$.species").value("Largemouth Bass"));

		mockMvc.perform(get("/api/catches"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[0].species").value("Largemouth Bass"));
	}

	@Test
	void shouldUpdateExistingCatch() throws Exception {
		FishCatch createdCatch = catchRepository.save(
				new FishCatch(
						"Largemouth Bass",
						"Pewaukee Lake",
						"2026-09-29",
						18.5));

		Long id = createdCatch.getId();

		String updatedCatch = """
				{
				    "species": "Smallmouth Bass",
				    "location": "Lake Geneva",
				    "date": "2026-10-16",
				    "length": 20.0
				}
				""";

		mockMvc.perform(put("/api/catches/" + id)
				.contentType(MediaType.APPLICATION_JSON)
				.content(updatedCatch))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value(id.intValue()))
				.andExpect(jsonPath("$.species").value("Smallmouth Bass"));

		mockMvc.perform(get("/api/catches/" + id))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value(id.intValue()))
				.andExpect(jsonPath("$.species").value("Smallmouth Bass"))
				.andExpect(jsonPath("$.location").value("Lake Geneva"));
	}

	@Test
	void shouldReturnNotFoundWhenUpdatingNonExistingCatch() throws Exception {
		int invalidId = 1;

		String updatedCatch = """
				{
				    "species": "Smallmouth Bass",
				    "location": "Lake Geneva",
				    "date": "2026-10-16",
				    "length": 20.0
				}
				""";

		mockMvc.perform(put("/api/catches/" + invalidId)
				.contentType(MediaType.APPLICATION_JSON)
				.content(updatedCatch))
				.andExpect(status().isNotFound());

		FishCatch createdCatch = catchRepository.save(
				new FishCatch(
						"Largemouth Bass",
						"Pewaukee Lake",
						"2026-09-29",
						18.5));

		Long id = createdCatch.getId();

		String invalidCatch = """
				{
				    "species": "",
				    "location": "",
				    "date": "2026-10-16",
				    "length": 0.0
				}
				""";

		mockMvc.perform(put("/api/catches/" + id)
				.contentType(MediaType.APPLICATION_JSON)
				.content(invalidCatch))
				.andExpect(status().isBadRequest());
	}
}