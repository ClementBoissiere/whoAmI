package com.purplerockstudios.whoami.personality;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
public class PersonalityServiceImpl implements PersonalityService {

	LocalDate memoryDate = LocalDate.now();
	PersonnalityMap personalities = new PersonnalityMap();
	String personalityOfTheDay = setPersonnalityOfTheDay();
	ArrayList<String> oldPersonalities = new ArrayList<>();
	Random random;

	@Override
	public String getPersonalityOfTheDay() {
		checkPersonnalityOfTheDay();
		return personalityOfTheDay;
	}

	private void checkPersonnalityOfTheDay() {
		if (LocalDate.now().isAfter(memoryDate)) {
			memoryDate = LocalDate.now();
			oldPersonalities.add(personalityOfTheDay);
			setPersonnalityOfTheDay();
		}
	}

	private String setPersonnalityOfTheDay() {
		personalityOfTheDay = getRandomKeyWithFalseValue(personalities.getPersonalities());
		personalities.getPersonalities().put(personalityOfTheDay, true);
		return personalityOfTheDay;
	}

	private String getRandomKeyWithFalseValue(Map<String, Boolean> map) {
		List<String> keysWithFalseValue = new ArrayList<>();
		for (Map.Entry<String, Boolean> entry : map.entrySet()) {
			if (Boolean.FALSE.equals(entry.getValue())) {
				keysWithFalseValue.add(entry.getKey());
			}
		}

		if (keysWithFalseValue.isEmpty()) {
			this.personalities.setAllPersonnalitiesToFalse();
			getRandomKeyWithFalseValue(personalities.getPersonalities());
		}
		random = new Random();
		int randomIndex = random.nextInt(keysWithFalseValue.size());

		return keysWithFalseValue.get(randomIndex);
	}

	@Override
	public boolean checkWin(String inputPersonality) {
		return inputPersonality.toUpperCase().contains(this.personalityOfTheDay.toUpperCase());
	}

	@Override
	public List<String> getOldPersonalities() {
		return this.oldPersonalities;
	}

	@Override
	public String getLastPersonality() {
		if (this.oldPersonalities.isEmpty()) {
			return "Johnny Hallyday";
		}
		return this.oldPersonalities.getLast();
	}

}
