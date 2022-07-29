import pandas as pd

animeType = "TV"
df1=pd.read_csv('./anime.csv')
C= df1['rating'].mean()
m= df1['members'].quantile(0.9)
q_animes = df1.copy().loc[df1['members'] >= m]
def weighted_rating(x, m=m, C=C):
    v = x['members']
    R = x['rating']
    # Calculation based on the IMDB formula
    return (v/(v+m) * R) + (m/(m+v) * C)
q_animes['rating'] = q_animes.apply(weighted_rating, axis=1)
pop= q_animes[(q_animes.type == animeType)].sort_values(['rating'], ascending=False)

q_animes_json = pop.head(10).to_json(
    orient='split',  # other options are (split’, ‘records’, ‘index’, ‘columns’, ‘values’, ‘table’)
    date_format='epoch',
    double_precision = 2,
    force_ascii=False,
    date_unit='ms',
    default_handler=None,
    lines=False, # orient must be records to set this True
    #compression='zip',
    index=False, # it works only when orient is split or table
    indent=2    
)
animes = q_animes_json
print("animes", animes)

with open('./result.txt', 'w') as f:
    f.write(animes) 