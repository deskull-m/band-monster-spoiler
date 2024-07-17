import streamlit as st
import pandas as pd
    
st.title("Bakabakaband Monster Spoiler")

monster_list = []
with open("bakabakaband/lib/edit/MonsterRaceDefinitions.txt", "r") as f:
    monster = {}
    for s in f:
        if len(s) > 2:
            if s[0:2] == 'N:':
                monster_list.append(monster)
                monster = {}
                monster["id"] = int(s[2:].strip().split(":")[0])
                monster["name"] = s[2:].strip().split(":")[1]
                
            elif s[0:2] == "E:":
                monster["ename"] = s[2:].strip().split(":")[0]

            elif s[0:2] == "G:":
                monster["symbol"] = s[2:].strip().split(":")[0]
                monster["color"] = s[2:].strip().split(":")[1]

            elif s[0:2] == "I:":
                values = s[2:].strip().split(":")
                monster["speed"] = values[0]
                monster["hp"] = values[1]
                monster["dis"] = values[2]
                monster["ac"] = values[3]
                monster["alert"] = values[4]

df = pd.DataFrame(monster_list)
st.dataframe(df)

'''
N:1:汚いイタズラ小僧
E:Filthy street urchin
G:t:D
I:110:1d4:4:1:40
W:0:2:0:10:14
B:BEG:FLAVOR
B:TOUCH:EAT_GOLD
F:MALE | EVIL | WILD_TOWN | WILD_ONLY
F:RAND_25 | FRIENDS | HUMAN | ROGUE
F:TAKE_ITEM | OPEN_DOOR | DROP_CORPSE | DROP_SKELETON
F:DROP_KIND_1_IN_5_102_0_1d1
D:$He looks squalid and thoroughly revolting.
D:彼は汚らしくて本当に頭に来る奴だ。
'''