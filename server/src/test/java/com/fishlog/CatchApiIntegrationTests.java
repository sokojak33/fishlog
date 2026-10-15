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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@AutoConfigureMockMvc
class CatchApiIntegrationTests {

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
		String newCatchJson = """
				{
				    "species": "Largemouth Bass",
				    "location": "Pewaukee Lake",
				    "date": "2026-09-29",
				    "length": 18.5
				}
				""";

		mockMvc.perform(post("/api/catches")
				.contentType(MediaType.APPLICATION_JSON)
				.content(newCatchJson))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").exists())
				.andExpect(jsonPath("$.species").value("Largemouth Bass"));

		List<FishCatch> savedCatches = catchRepository.findAll();

		assertThat(savedCatches).hasSize(1);
		assertThat(savedCatches.getFirst().getSpecies())
				.isEqualTo("Largemouth Bass");
	}

	@Test
	void shouldRejectInvalidCatchCreation() throws Exception {
		String invalidSpeciesJson = """
				{
				    "species": "",
				    "location": "Oconomowoc Lake",
				    "date": "2025-02-15",
				    "length": 17.7
				}
				""";

		mockMvc.perform(post("/api/catches")
				.contentType(MediaType.APPLICATION_JSON)
				.content(invalidSpeciesJson))
				.andExpect(status().isBadRequest());

		String invalidLocationJson = """
				{
				    "species": "Walleye",
				    "location": "",
				    "date": "2025-02-15",
				    "length": 17.7
				}
				""";

		mockMvc.perform(post("/api/catches")
				.contentType(MediaType.APPLICATION_JSON)
				.content(invalidLocationJson))
				.andExpect(status().isBadRequest());

		String invalidDateJson = """
				{
				    "species": "Walleye",
				    "location": "Oconomowoc Lake",
				    "date": "",
				    "length": 17.7
				}
				""";

		mockMvc.perform(post("/api/catches")
				.contentType(MediaType.APPLICATION_JSON)
				.content(invalidDateJson))
				.andExpect(status().isBadRequest());

		String invalidLengthJson = """
				{
				    "species": "Walleye",
				    "location": "Oconomowoc Lake",
				    "date": "2025-02-15",
				    "length": 0.0
				}
				""";

		mockMvc.perform(post("/api/catches")
				.contentType(MediaType.APPLICATION_JSON)
				.content(invalidLengthJson))
				.andExpect(status().isBadRequest());

		assertThat(catchRepository.findAll()).isEmpty();
	}

	@Test
	void shouldGetExistingCatch() throws Exception {
		FishCatch createdCatch = catchRepository.save(
				new FishCatch(
						"Largemouth Bass",
						"Pewaukee Lake",
						"2026-09-29",
						18.5));

		Long id = createdCatch.getId();

		mockMvc.perform(get("/api/catches/" + id))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value(id.intValue()))
				.andExpect(jsonPath("$.species").value("Largemouth Bass"))
				.andExpect(jsonPath("$.location").value("Pewaukee Lake"))
				.andExpect(jsonPath("$.date").value("2026-09-29"))
				.andExpect(jsonPath("$.length").value(18.5));
	}

	@Test
	void shouldGetAllCatches() throws Exception {
		catchRepository.save(
				new FishCatch(
						"Largemouth Bass",
						"Pewaukee Lake",
						"2026-09-29",
						18.5));

		catchRepository.save(
				new FishCatch(
						"Northern Pike",
						"Lake Wingra",
						"2026-09-18",
						19.2));

		mockMvc.perform(get("/api/catches"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.length()").value(2))
				.andExpect(jsonPath("$[0].species").value("Largemouth Bass"))
				.andExpect(jsonPath("$[1].species").value("Northern Pike"));
	}

	@Test
	void shouldReturnNotFoundWhenGettingNonExistingCatch() throws Exception {
		Long nonExistingId = 1L;

		mockMvc.perform(get("/api/catches/" + nonExistingId))
				.andExpect(status().isNotFound());
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

		String updatedCatchJson = """
				{
				    "species": "Smallmouth Bass",
				    "location": "Lake Geneva",
				    "date": "2026-10-16",
				    "length": 20.0
				}
				""";

		mockMvc.perform(put("/api/catches/" + id)
				.contentType(MediaType.APPLICATION_JSON)
				.content(updatedCatchJson))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value(id.intValue()))
				.andExpect(jsonPath("$.species").value("Smallmouth Bass"))
				.andExpect(jsonPath("$.location").value("Lake Geneva"))
				.andExpect(jsonPath("$.date").value("2026-10-16"))
				.andExpect(jsonPath("$.length").value(20.0));

		List<FishCatch> savedCatches = catchRepository.findAll();

		assertThat(savedCatches).hasSize(1);
		assertThat(savedCatches.getFirst().getSpecies())
				.isEqualTo("Smallmouth Bass");
		assertThat(savedCatches.getFirst().getLocation())
				.isEqualTo("Lake Geneva");
		assertThat(savedCatches.getFirst().getDate())
				.isEqualTo("2026-10-16");
		assertThat(savedCatches.getFirst().getLength())
				.isEqualTo(20.0);
		assertThat(savedCatches.getFirst().getId()).isEqualTo(id);
	}

	@Test
	void shouldReturnNotFoundWhenUpdatingNonExistingCatch() throws Exception {
		Long nonExistingId = 1L;

		String updatedCatchJson = """
				{
				    "species": "Smallmouth Bass",
				    "location": "Lake Geneva",
				    "date": "2026-10-16",
				    "length": 20.0
				}
				""";

		mockMvc.perform(put("/api/catches/" + nonExistingId)
				.contentType(MediaType.APPLICATION_JSON)
				.content(updatedCatchJson))
				.andExpect(status().isNotFound());
	}

	@Test
	void shouldRejectInvalidCatchUpdate() throws Exception {
		FishCatch createdCatch = catchRepository.save(
				new FishCatch(
						"Largemouth Bass",
						"Lake Mendota",
						"2026-10-11",
						12.3));

		Long id = createdCatch.getId();

		String invalidSpeciesJson = """
				{
				    "species": "",
				    "location": "Lake Mendota",
				    "date": "2026-10-11",
				    "length": 12.3
				}
				""";

		mockMvc.perform(put("/api/catches/" + id)
				.contentType(MediaType.APPLICATION_JSON)
				.content(invalidSpeciesJson))
				.andExpect(status().isBadRequest());

		String invalidLocationJson = """
				{
				    "species": "Largemouth Bass",
				    "location": "",
				    "date": "2026-10-11",
				    "length": 12.3
				}
				""";

		mockMvc.perform(put("/api/catches/" + id)
				.contentType(MediaType.APPLICATION_JSON)
				.content(invalidLocationJson))
				.andExpect(status().isBadRequest());

		String invalidDateJson = """
				{
				    "species": "Largemouth Bass",
				    "location": "Lake Mendota",
				    "date": "",
				    "length": 12.3
				}
				""";

		mockMvc.perform(put("/api/catches/" + id)
				.contentType(MediaType.APPLICATION_JSON)
				.content(invalidDateJson))
				.andExpect(status().isBadRequest());

		String invalidLengthJson = """
				{
				    "species": "Largemouth Bass",
				    "location": "Lake Mendota",
				    "date": "2026-10-11",
				    "length": 0.0
				}
				""";

		mockMvc.perform(put("/api/catches/" + id)
				.contentType(MediaType.APPLICATION_JSON)
				.content(invalidLengthJson))
				.andExpect(status().isBadRequest());

		FishCatch persistedCatch = catchRepository.findById(id).orElseThrow();

		assertThat(persistedCatch.getSpecies())
				.isEqualTo("Largemouth Bass");
		assertThat(persistedCatch.getLocation())
				.isEqualTo("Lake Mendota");
		assertThat(persistedCatch.getDate())
				.isEqualTo("2026-10-11");
		assertThat(persistedCatch.getLength())
				.isEqualTo(12.3);
	}

	@Test
	void shouldDeleteExistingCatch() throws Exception {
		FishCatch createdCatch = catchRepository.save(
				new FishCatch(
						"Largemouth Bass",
						"Pewaukee Lake",
						"2026-09-29",
						18.5));

		Long id = createdCatch.getId();

		mockMvc.perform(delete("/api/catches/" + id))
				.andExpect(status().isNoContent());

		assertThat(catchRepository.existsById(id)).isFalse();
	}

	@Test
	void shouldReturnNotFoundWhenDeletingNonExistingCatch() throws Exception {
		Long nonExistingId = 1L;

		mockMvc.perform(delete("/api/catches/" + nonExistingId))
				.andExpect(status().isNotFound());
	}

}