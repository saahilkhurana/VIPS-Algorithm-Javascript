import tensorflow as tf 

classifier = tf.estimator.LinearClassifier(feature_columns)
classifier.train(input_fn = train_input_fn, steps = 2000)
predictions = classifier.predict(input_fn = predict_input_fn)



cities = pd.DataFrame({ 'City name': city_names, 'Population': population })
print type(cities['City name'])
cities['City name']

o/p -
<class 'pandas.core.series.Series'>
0    San Francisco
1         San Jose
2       Sacramento
Name: City name, dtype: object



print type(cities[0:2])
cities[0:2]

<class 'pandas.core.frame.DataFrame'>
City name	Population
0	San Francisco	852469
1	San Jose	1015785


for i,v in enumerate(['saahil', 'payal', 'meenal'])
	print(i,v)
	0 saahil
	1 payal
	2 meenal
	