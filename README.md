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

