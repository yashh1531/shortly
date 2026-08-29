package com.shortly.shrortly.util;

public class Base62 {
    private static final String CHARACTERS =
            "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    public static String encode(long number) {

        if (number == 0) {
            return "0";
        }

        StringBuilder result = new StringBuilder();

        while (number > 0) {
            int remainder = (int) (number % 62);
            result.append(CHARACTERS.charAt(remainder));
            number = number / 62;
        }

        return result.reverse().toString();
    }
    public static String encodeToSixCharacters(long number) {

        String encoded = encode(number);

        if (encoded.length() > 6) {
            throw new IllegalArgumentException(
                    "Encoded value exceeds 6 characters"
            );
        }

        return "0".repeat(6 - encoded.length()) + encoded;
    }

}
