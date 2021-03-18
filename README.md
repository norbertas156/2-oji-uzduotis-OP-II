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

### V0.4 analizės rezultatai naudojant failus, sudarytus iš: 1000, 10000, 100000, 1000000, 10000000 įrašų

```shell
studentai1000.txt failo irasu nuskaitymas uztruko: 0.002976 s
studentai1000.txt irasu Sortinimo trukme: 0.000992 s
studentai1000.txt irasu dalijimo i kietekus ir nelaiminguosius trukme: 0.000496 s
studentai1000.txt failo irasu ivedimas i kietekus: 0.009423 s
studentai1000.txt failo irasu ivedimas i nelaiminguosius: 0.008928 s
```
```shell
studentai10000.txt failo irasu nuskaitymas uztruko: 0.017359 s
studentai10000.txt irasu Sortinimo trukme: 0.012896 s
studentai10000.txt irasu dalijimo i kietekus ir nelaiminguosius trukme: 0.008433 s
studentai10000.txt failo irasu ivedimas i kietekus: 0.046128 s
studentai10000.txt failo irasu ivedimas i nelaiminguosius: 0.037695 s
```
```shell
studentai100000.txt failo irasu nuskaitymas uztruko: 0.220223 s
studentai100000.txt irasu Sortinimo trukme: 0.162192 s
studentai100000.txt irasu dalijimo i kietekus ir nelaiminguosius trukme: 0.051582 s
studentai100000.txt failo irasu ivedimas i kietekus: 0.279248 s
studentai100000.txt failo irasu ivedimas i nelaiminguosius: 0.206831 s
```
```shell
studentai1000000.txt failo irasu nuskaitymas uztruko: 1.63532 s
studentai1000000.txt irasu Sortinimo trukme: 2.06187 s
studentai1000000.txt irasu dalijimo i kietekus ir nelaiminguosius trukme: 0.45581 s
studentai1000000.txt failo irasu ivedimas i kietekus: 2.73346 s
studentai1000000.txt failo irasu ivedimas i nelaiminguosius: 1.95176 s
```
```shell
studentai10000000.txt failo irasu nuskaitymas uztruko: 22.2749 s
studentai10000000.txt irasu Sortinimo trukme: 25.6804 s
studentai10000000.txt irasu dalijimo i kietekus ir nelaiminguosius trukme: 4.64403 s
studentai10000000.txt failo irasu ivedimas i kietekus: 27.1763 s
studentai10000000.txt failo irasu ivedimas i nelaiminguosius: 19.5409 s
```
