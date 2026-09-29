package com.fishlog;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.http.MediaType;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ServerApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Test
	void shouldCreateAndReturnCatch() throws Exception {
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
}