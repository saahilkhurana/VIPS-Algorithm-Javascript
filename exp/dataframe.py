import pandas as pd 
california_housing_dataframe = pd.read_csv("https://storage.googleapis.com/mledu-datasets/california_housing_train.csv",sep = ",")

california_housing_dataframe = california_housing_dataframe.reindex(numpy.random.permutation(california_housing_dataframe.index))
california_housing_dataframe["median_house_value"] /= 1000.0 # in python, always use double

california_housing_dataframe.describe()
feature_cols = total_rooms
classifier = tf.estimator.LinearClassifier(feature_columns)
classifier.train(train_input_fn, steps = 2000)
classifier.predict(predict_data)



from tensorflow.python.data import Dataset
import pandas as pd
ch_dataframe = pd.read_csv(url, sep=",")
ch_dataframe = ch_dataframe.reindex(np.random.permutation(ch_dataframe.index))
ch_dataframe["median_house_value"] = ch_dataframe["median_house_value"]/1000.0

# converts pandas to tf
def my_input_fn(features, targets, batch_size=1, shuffle=True, num_epochs=None):
	# features: pandas dataframe of features {"population":[],"total_rooms":[]}
    # targets: pandas dataframe of features
    
    #convert pandas into dict of np arrays
    features = {key:np.array(value) for key, value in dict(features).items()}

    ds = tf.data.Dataset.from_tensor_slices((features,targets))
    ds = ds.batch(batch_size).repeat(num_epochs) 

    if shuffle:
    	ds = ds.shuffle(buffer_size = 10000)

    features, labels = ds.make_one_shot_iterator().get_next()
    return features, labels

def train_model(learning_rate, steps, batch_size, input_feature):
	periods = 10
	steps_per_period = steps/periods
	my_feature = input_feature
	my_feature_data = ch_dataframe[[my_feature]]
	my_label = "median_house_value"
	target = ch_dataframe[my_label]

	#create input functions
	train_input_fn = lambda: my_input_fn(my_feature_data, targets, batch_size=batch_size)
	predict_train_input_fn = lambda: my_input_fn(my_feature_data, targets, num_epochs=1, shuffle=False)

	feature_columns = [tf.feature_column.numeric_column(my_feature)]

	linear_regressor = tf.estimator.LinearRegressor(
		feature_columns = feature_columns,
		optimizer = my_optimizer
	)

    for period in range(0, periods):
    	linear_regressor.train(
    		input_fn = training_input_fn,
    		steps = steps_per_period
    		)

    predictions = linear_regressor.predict(input_fn = predict_train_input_fn)
    predictions = np.array([item['predictions'][0] for item in predictions])

train_fn(
	rate = 0.00002
	steps = 1000
	batch_size = 5
	input_feature="population")	

calibration_data = pd.DataFrame()
calibration_data["predictions"] = pd.Series(predictions)
calibration_data["targets"] = pd.Series(targets)

Inorder to avoid over fitting, you should lower the dimensions of your model.
Thats why dimensionality reduction is preferred.


ch_dataframe = ch_dataframe.reindex(np.random.permutation(ch_dataframe.index))

if training data is not huge like 1 billion, then do cross validation. Otherwise for huge
datasets divide them in 80-20% ratio for training and testing.
never train on your test data, otherwise you will magically get 100% accuracy on your test
data.
-----Splitting data ----------
Make sure that your test set meets the following two conditions:

Is large enough to yield statistically meaningful results.
Is representative of the data set as a whole. In other words, don't pick a test set with different characteristics than the training set.

Never train on test data. If you are seeing surprisingly good results on your evaluation 
metrics, it might be a sign that you are accidentally training on the test set.
For example, high accuracy might indicate that test data has leaked into the training set.

For example, consider a model that predicts whether an email is spam, using the subject line, 
email body, and sender's email address as features. We apportion the data into training and
test sets, with an 80-20 split. After training, the model achieves 99% precision on both the 
training set and the test set. We'd expect a lower precision on the test set, so we take
another look at the data and discover that many of the examples in the test set are 
duplicates of examples in the training set (we neglected to scrub duplicate entries 
for the same spam email from our input database before splitting the data). We've 
inadvertently trained on some of our test data, and as a result, we're no longer 
accurately measuring how well our model generalizes to new data.

Q) We looked at a process of using a test set and
a training set to drive iterations of model development. 
On each iteration, we'd train on the training data 
and evaluate on the test data, using the evaluation results
 on test data to guide choices of and changes to various model 
 hyperparameters like learning rate and features. Is there anything 
 wrong with this approach? (Pick only one answer.)

Doing many rounds of this procedure might cause us to implicitly fit to the peculiarities
of our specific test set.
Yes indeed! The more often we evaluate on a given test set, 
the more we are at risk for implicitly overfitting to that one test set. 
We'll look at a better protocol next.
