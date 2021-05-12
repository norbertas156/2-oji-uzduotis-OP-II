# 2-oji-uzduotis-OP-
Objektinio programavimo 2-oji uzduotis
------------------------------------------------
Programa skirta apskaičiuoti vidurkį ir medianą

# Kaip veikia programa

  1. Įvedamas vardas ir pavardė
  2. Pasirenkamas pažymiu įvedimo būdas
  3. Ir pasirenkamas galutinio pažymio skaičiavimo būdas(vidurkis, mediana)

# Galutinis programos veikimo funkcijos

  1. Pasirinkus pradžioje b kodas vykdo duomenų spartos analizes, bet tam reikia failu: studentai1000.txt, studentai10000.txt, studentai100000.txt, studentai1000000.txt, studentai10000000.txt 
  2. Pasirinkus pradžioje r kodas vykdo vartotojo įvesties ir failu normalų veikima

# Programos veikimo pavyzdys vykdant normalų veikima

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

# Programos veikimo pavyzdys vykdant duomenų spartos analize

```
Ar norite atlikti spartos analize(b) ar norite ivesti ranka(r)?
b
Iveskite 1 norint atlikti spartos analize naudojant 2 naujus konteinerius
Iveskite 2 norint atlikti spartos analize naudojant 1 nauja konteineri
2
Iveskite 1 spartos analize atlikti naudojant vector konteineri
Iveskite 2 spartos analize atlikti naudojant deque konteineri
Iveskite 3 spartos analize atlikti naudojant list konteineri
1
studentai1000.txt failo irasu nuskaitymas uztruko: 0.007006 s
studentai1000.txt irasu Sortinimo trukme: 0.000977 s
studentai1000.txt irasu dalijimo i kietekus ir nelaiminguosius trukme: 0 s
studentai1000.txt failo irasu ivedimas i kietekus: 0.003999 s
studentai1000.txt failo irasu ivedimas i nelaiminguosius: 0.002994 s
Programos trukme: 0.083776

studentai10000.txt failo irasu nuskaitymas uztruko: 0.037898 s
studentai10000.txt irasu Sortinimo trukme: 0.013963 s
studentai10000.txt irasu dalijimo i kietekus ir nelaiminguosius trukme: 0.001996 s
studentai10000.txt failo irasu ivedimas i kietekus: 0.042885 s
studentai10000.txt failo irasu ivedimas i nelaiminguosius: 0.02293 s
Programos trukme: 0.148602

studentai100000.txt failo irasu nuskaitymas uztruko: 0.268789 s
studentai100000.txt irasu Sortinimo trukme: 0.157575 s
studentai100000.txt irasu dalijimo i kietekus ir nelaiminguosius trukme: 0.019501 s
studentai100000.txt failo irasu ivedimas i kietekus: 0.318164 s
studentai100000.txt failo irasu ivedimas i nelaiminguosius: 0.208948 s
Programos trukme: 1.14353

studentai1000000.txt failo irasu nuskaitymas uztruko: 3.1321 s
studentai1000000.txt irasu Sortinimo trukme: 2.02982 s
studentai1000000.txt irasu dalijimo i kietekus ir nelaiminguosius trukme: 0.223389 s
studentai1000000.txt failo irasu ivedimas i kietekus: 2.83721 s
studentai1000000.txt failo irasu ivedimas i nelaiminguosius: 1.99988 s
Programos trukme: 12.099

studentai10000000.txt failo irasu nuskaitymas uztruko: 29.7123 s
studentai10000000.txt irasu Sortinimo trukme: 25.5751 s
studentai10000000.txt irasu dalijimo i kietekus ir nelaiminguosius trukme: 2.28666 s
studentai10000000.txt failo irasu ivedimas i kietekus: 28.6697 s
studentai10000000.txt failo irasu ivedimas i nelaiminguosius: 19.8364 s
Programos trukme: 121.437
```

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

# V1.0

 1. Pridėta galimybė atlikti duomenų spartos analize naudojant skirtingus filtravimo metodus ty. filtruojant į tik vieną naują konteinerį
 2. Paspartintas vector, deque veikimas naudojant assign
 3. Sukurtas cmake failas
 4. Atnaujinta naudojimo instrukcija

# V1.1

 1. Padaryta, kad galima generuoti faila iškarto
 2. Struct pakeista į class ir atnaujintas kodas, jog veiktu su class

# V1.2

 1. Pridėta prie klasių naikinimo, kopijavimo ir priskyrimo operacijų

# V1.2

 1. Sukurta bazinė klasė žmogus, kuri laiko vardą ir pavardę



## 1 strategijos atnaujinti rezultatai

VECTOR                          |  1000  | 10000 | 100000 | 1000000 | 10000000 |
--------------------------------|--------|-------|--------|---------|----------|
duomenų nuskaitymą iš failų     | 0.008  | 0.038 | 0.268  |  3.180  |   30.06  |
studentų rūšiąvimą į dvi grupes | 0      | 0.001 | 0.034  |  0.329  |   3.392  |
--------------------------------------------------------------------------------
LIST                            |  1000  | 10000 | 100000 | 1000000 | 10000000 |
--------------------------------|--------|-------|--------|---------|----------|
duomenų nuskaitymą iš failų     | 0.007  | 0.036 | 0.276  |  3.263  |   30.29  |
studentų rūšiąvimą į dvi grupes |  0.001 | 0.003 | 0.065  |  0.642  |  6.426   |
--------------------------------------------------------------------------------
DEQUE                           |  1000  | 10000 | 100000 | 1000000 | 10000000 |
--------------------------------|--------|-------|--------|---------|----------|
duomenų nuskaitymą iš failų     | 0.007  | 0.036 | 0.269  |  3.163  |   31.59  |
studentų rūšiąvimą į dvi grupes | 0      | 0.003 | 0.043  |  0.427  |   4.420  |

## 2 strategijos rezultatai

VECTOR                          |  1000  | 10000 | 100000 | 1000000 | 10000000 |
--------------------------------|--------|-------|--------|---------|----------|
duomenų nuskaitymą iš failų     | 0.007  | 0.036 | 0.274  |  3.134  |   30.00  |
studentų rūšiąvimą į dvi grupes | 0      | 0.0009| 0.022  |  0.212  |   2.290  |
--------------------------------------------------------------------------------
LIST                            |  1000  | 10000 | 100000 | 1000000 | 10000000 |
--------------------------------|--------|-------|--------|---------|----------|
duomenų nuskaitymą iš failų     | 0.007  | 0.036 | 0.280  |  3.214  |   30.57  |
studentų rūšiąvimą į dvi grupes | 0.0009 | 0.002 | 0.038  |  0.441  |   4.266  |
--------------------------------------------------------------------------------
DEQUE                           |  1000  | 10000 | 100000 | 1000000 | 10000000 |
--------------------------------|--------|-------|--------|---------|----------|
duomenų nuskaitymą iš failų     | 0.006  | 0.039 | 0.277  |  3.145  |   29.32  |
studentų rūšiąvimą į dvi grupes | 0.0009 | 0.002 | 0.024  |  0.286  |   3.022  |

## Optimizuoto Vektoriaus rezultatai(naudojant find_if)

VECTOR                          |  1000  | 10000 | 100000 | 1000000 | 10000000 |
--------------------------------|--------|-------|--------|---------|----------|
duomenų nuskaitymą iš failų     | 0.007  | 0.041 | 0.268  |  3.132  |   29.71  |
studentų rūšiąvimą į dvi grupes | 0      | 0.001 | 0.018  |  0.217  |   2.286  |

## Struct prieš Class naudojant vektorius ir 1 nauja konteinerį

Struct                          | 1000000 | 10000000 |
--------------------------------|---------|----------|
duomenų nuskaitymą iš failų     |  3.125  |   30.08  |
Sortinimo trukme                |  2.050 | 25.51    |
studentų rūšiąvimą į dvi grupes |  0.227  |  2.280  |


Class                         | 1000000 | 10000000 |
------------------------------|---------|----------|
duomenų nuskaitymą iš failų   |  4.243  |   40.63  |
Sortinimo trukme              |   2.158 | 26.78    |
studentų rūšiąvimą į dvi grupes |  0.219  |  2.323  |

## Naudojant optimizacijos flag'us

Struct                         | 1000000 | 10000000 |
------------------------------|---------|----------|
O1|||
duomenų nuskaitymą iš failų   |   2.173  |   20.40  |
Sortinimo trukme              |   0.267 | 3.175    |
studentų rūšiąvimą į dvi grupes |  0.137  |   1.500  |
O2|||
duomenų nuskaitymą iš failų   |   2.190  |   20.59  |
Sortinimo trukme              |   0.264 | 3.159    |
studentų rūšiąvimą į dvi grupes |   0.140  |   1.527  |
O3|||
duomenų nuskaitymą iš failų   |   2.183  |   20.55  |
Sortinimo trukme              |   0.236 | 2.856    |
studentų rūšiąvimą į dvi grupes | 0.141  |   1.496  |

Class                         | 1000000 | 10000000 |
------------------------------|---------|----------|
O1|||
duomenų nuskaitymą iš failų   |   2.720  |   25.36  |
Sortinimo trukme              |   0.267 | 3.094    |
studentų rūšiąvimą į dvi grupes |  0.140  |   1.503  |
O2|||
duomenų nuskaitymą iš failų   |   2.838  |   25.20  |
Sortinimo trukme              |   0.267 | 3.158    |
studentų rūšiąvimą į dvi grupes |  0.142  |   1.486  |
O3|||
duomenų nuskaitymą iš failų   |   2.651  |   25.00  |
Sortinimo trukme              |    0.250 | 3.033    |
studentų rūšiąvimą į dvi grupes | 0.138  |  1.500 |
