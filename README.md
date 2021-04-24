# 2-oji-uzduotis-OP-
Objektinio programavimo 2-oji uzduotis
------------------------------------------------
Programa skirta apskaičiuoti vidurkį ir medianą

# Kaip veikia programa

  1. Įvedamas vardas ir pavardė
  2. Pasirenkamas pažymiu įvedimo būdas
  3. Ir pasirenkamas galutinio pažymio skaičiavimo būdas(vidurkis, mediana)

# Programos veikimo pavyzdys

```shell
Iveskite varda
Deividas
Iveskite pavarde
Gelzinis
Ar zinote namu darbu skaiciu? (t-taip, bet kokia kita raide-ne)
t
Iveskite pazymiu skaiciu
5
Ar norite namu darbus ivesti ranka? (t-taip, bet kokia kita raide-ne)
n
Atsitiktinai sugeneruoti namu darbai: 5 3 3 4 10 Atsitiktinai sugeneruotas egzamino rezultatas: 2
Ar norite ivesti dar viena studenta?
t
Iveskite varda
Jonas
Iveskite pavarde
Jonaitis
Ar zinote namu darbu skaiciu? (t-taip, bet kokia kita raide-ne)
n
Noredami nutraukti ivedima iveskite 0!
1-asis namu darbas
5
2-asis namu darbas
7
3-asis namu darbas
9
4-asis namu darbas
9
5-asis namu darbas
0
Iveskite egzamino rezultata
6
Ar norite ivesti dar viena studenta?
n
Norite galutini pazymi vidurkiu(v), mediana(m) ar abiem(a)
v
Pavarde   Vardas    Galutinis(vid.)
------------------------------------------
Gelzinis  Deividas  3.20
Jonaitis  Jonas     6.40
```
Programa realizuota 2 būdais: pirmasis būdas išsaugant įvestus pažymius į C masyvą, antrasis būdas išsaugant įvestus pažymius į vektorių.

## Galutinis įvertinimas skaičiuojamas `0.4*pazymiu_vidurkis+0.6*egzamino_pazymys`

# Įdiegimas
 1. Atsisiūskite failą iš norimo release ir išsiarchyvuokite
 2. Poto komandinėje eilutėje įveskite:
```shell
cd Failas_kuriame_issaugotas_kodas
g++ main_vector.cpp -o main
./main
```
# V0.2

 1. Pašalintas main_array.cpp
 2. main_vector.cpp pervadintas į main.cpp
 3. Pridėtas failo skaitymas
 4. Pridėtas testinis failas Kursiokai.txt
 5. Studentai rikiuojami palei pavardes
 6. Rezultatai saugomi į Rezultatai.txt failą

# V0.3

 1. Pridėta galimybė įvesti failo pavadinimą
 2. Funkcijos išskaidytos į atskirus .cpp failus
 3. Paspartintas rikiavimo greitis
 4. Pridėtas EXCEPTION HANDLING
 5. Pridėtas Funkciju failas, kuriame yra visos programa vykdancios funkcijos

# V0.4 
  
 1. Pridėta galimybė sugeneruoti naują failą
 2. Pridėta funkcija rikiuojanti pagal vidurkius
 3. Pridėtas studentų rūšiavimas į kietekus ir nelaiminguosius
 4. Pridėtas kodo greičio matavimas

## V0.4 analizės rezultatai naudojant failus, sudarytus iš: 1000, 10000, 100000, 1000000, 10000000 įrašų

```shell
studentai1000.txt failo irasu nuskaitymas uztruko: 0.007978 s
studentai1000.txt irasu Sortinimo trukme: 0.001001 s
studentai1000.txt irasu dalijimo i kietekus ir nelaiminguosius trukme: 0.000998 s
studentai1000.txt failo irasu ivedimas i kietekus: 0.00399 s
studentai1000.txt failo irasu ivedimas i nelaiminguosius: 0.001994 s
Programos trukme: 0.130763
```
```shell
studentai10000.txt failo irasu nuskaitymas uztruko: 0.041888 s
studentai10000.txt irasu Sortinimo trukme: 0.014958 s
studentai10000.txt irasu dalijimo i kietekus ir nelaiminguosius trukme: 0.007978 s
studentai10000.txt failo irasu ivedimas i kietekus: 0.039896 s
studentai10000.txt failo irasu ivedimas i nelaiminguosius: 0.039893 s
Programos trukme: 0.350062
```
```shell
studentai100000.txt failo irasu nuskaitymas uztruko: 0.293216 s
studentai100000.txt irasu Sortinimo trukme: 0.166556 s
studentai100000.txt irasu dalijimo i kietekus ir nelaiminguosius trukme: 0.050863 s
studentai100000.txt failo irasu ivedimas i kietekus: 0.438825 s
studentai100000.txt failo irasu ivedimas i nelaiminguosius: 0.410407 s
Programos trukme: 1.64661
```
```shell
studentai1000000.txt failo irasu nuskaitymas uztruko: 3.36296 s
studentai1000000.txt irasu Sortinimo trukme: 2.08653 s
studentai1000000.txt irasu dalijimo i kietekus ir nelaiminguosius trukme: 0.463761 s
studentai1000000.txt failo irasu ivedimas i kietekus: 2.98395 s
studentai1000000.txt failo irasu ivedimas i nelaiminguosius: 2.0434 s
Programos trukme: 14.303
```
```shell
studentai10000000.txt failo irasu nuskaitymas uztruko: 31.4376 s
studentai10000000.txt irasu Sortinimo trukme: 26.1933 s
studentai10000000.txt irasu dalijimo i kietekus ir nelaiminguosius trukme: 4.38798 s
studentai10000000.txt failo irasu ivedimas i kietekus: 29.2662 s
studentai10000000.txt failo irasu ivedimas i nelaiminguosius: 21.4353 s
Programos trukme: 128.8
```
# V0.5 
  
 1. Pridėta galimybė atlikti duomenų spartos analize naudojant skirtingo tipo konteinerius
 2. Pridėtas EXCEPTION gaudymas, kuris apsaugo duomenų spartos analizę
 3. Norint atlikti duomenų spartos analizę reikia turėti failus: studentai1000.txt, studentai10000.txt, studentai100000.txt, studentai1000000.txt, studentai10000000.txt

## V0.5 analizės rezultatai naudojant failus, sudarytus iš: 1000, 10000, 100000, 1000000, 10000000 įrašų.
### Kompiuterio specifikacijos: 

  Procesorius Intel(R) Core(TM) I5-6500 3.2 GHz
  
  24 Gb RAM 2133 MHz
  
  SSD ATA Samsung 850 SCSI
  
### Rezultatai

VECTOR                          |  1000  | 10000 | 100000 | 1000000 | 10000000 |
--------------------------------|--------|-------|--------|---------|----------|
duomenų nuskaitymą iš failų     | 0.007  | 0.041 | 0.293  |  3.362  |   31.43  |
studentų rūšiąvimą į dvi grupes | 0.0004 | 0.008 | 0.051  |  0.455  |   4.387  |
--------------------------------------------------------------------------------
LIST                            |  1000  | 10000 | 100000 | 1000000 | 10000000 |
--------------------------------|--------|-------|--------|---------|----------|
duomenų nuskaitymą iš failų     | 0.008  | 0.038 | 0.296  |  3.510  |   33.19  |
studentų rūšiąvimą į dvi grupes | 0.0004 | 0.004 | 0.062  |  0.661  |   6.584  |
--------------------------------------------------------------------------------
DEQUE                           |  1000  | 10000 | 100000 | 1000000 | 10000000 |
--------------------------------|--------|-------|--------|---------|----------|
duomenų nuskaitymą iš failų     | 0.008  | 0.044 | 0.286  |  3.339  |   31.96  |
studentų rūšiąvimą į dvi grupes | 0.0009 | 0.005 | 0.054  |  0.551  |   6.411  |


