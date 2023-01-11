# chat-app

##TODO:

Maciek:
- rozlacz z chatu po wyjsciu
- my chats
- przycisk do dodania pary

Radek:

- timeout, po 15 sekundach bez pary znajduje losową osobę (nie wiem czy to ma sens bo połączy sie z użytkownikiem który nie czeka jeszcze 15 sec a dostanie kogoś bez hobby)
- ✅?mychats
- avatar1/avatar2/avatar3/avatar4 do zapisywania w bazie danych w polu avatar, nie potrzebne przy rejestrowaniu, dopiero przy wyborze z profilu
- mychats pobieranie listy osób, dopiero po kliknięciu pobiera całą rozmowę z daną osobą
- status pending, accepted, notaccepted


Razem:
- przycisk do akceptowania pary (przemyśleć sposób w jaki)
- do rejestracji dodać email, powtórz hasło, rok urodzenia


Może kiedyś:
- notifiaction
- waiting room albo coś innego lub minigierka

Zrobione:
- ✅łączyło przynajmniej jak są jedno wspólne zainteresowanie
- ✅cors 
- ✅walidacja username email przy rejestracji
- ✅api zmiana hobby
- ✅api zmiana email, hasło, rok urodzenia
- ✅profil zmiana hobby, email, hasło, avatary do wyboru
- ✅logowanie newUser, hobby 
- ✅pobrać z bazy danych hobby po logowaniu i socket.emit do tego
- ✅wszystkie strony z menu pouzupełniać (na razie git)
- ✅responsive design na całej aplikacji, okienko czatu poprawić input, button
- ✅nie łączyć się z "duchem"
- ✅socket łączył się tylko w MainChat, a nie na starcie (zrobione, lazy loading)
- ✅usunąć notification
- ✅nie wysyłać pustych wiadomości
- ✅logout przycisk zmienić na button
- ✅wysyłanie wiadomości na czacie przez enter na klawiaturze
- ✅rejestracja: rok urodzenia, hasło walidacja, email
- ✅messagebox error, ładniejszy zrobić
- ✅Logowanie / rejestracja frontend (zrobione)
- ✅logowanie / rejestracja backend (zrobione)
- ✅baza danych (zrobione)
- ✅API (zrobione)
- ✅Hobby wybór (zrobione)
- ✅czekanie aż znajdzie drugą osobę (zrobione)
- ✅socket tylko w okienku chatu, reszta to api/baza danych (zrobione)
- ✅socket.emit wykminić/random room (zrobione)


