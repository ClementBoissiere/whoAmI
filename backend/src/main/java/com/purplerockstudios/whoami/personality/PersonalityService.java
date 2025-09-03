package com.purplerockstudios.whoami.personality;

import java.util.List;

public interface PersonalityService {

	String getPersonalityOfTheDay();

	boolean checkWin(String inputPersonality);

	List<String> getOldPersonalities();

	String getLastPersonality();
}
