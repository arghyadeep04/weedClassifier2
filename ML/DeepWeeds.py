import os
import urllib.request
import shutil
from keras.preprocessing.image import ImageDataGenerator
from keras.models import load_model
import numpy as np

# Global paths
PREDICT_DIR = "./predict/"

CLASSES = ['0', '1', '2', '3', '4', '5', '6', '7', '8']
CLASS_NAMES = ['Chinee Apple',
               'Lantana',
               'Parkinsonia',
               'Parthenium',
               'Prickly Acacia',
               'Rubber Vine',
               'Siam Weed',
               'Snake Weed',
               'Negatives']


def return_back(url):
        if os.path.exists('predict/images'):
                shutil.rmtree('predict/images')
        os.makedirs('predict/images')        
        urllib.request.urlretrieve(url, os.path.join("predict/images", "img_file.jpg"))
        model_name = "ML\lastbest-0-1.hdf5"
        model = load_model(model_name)

        datagen = ImageDataGenerator(rescale=1. / 255)
        generator = datagen.flow_from_directory(
                PREDICT_DIR,
                target_size=(224,224),
                batch_size=1,
                class_mode=None,  # only data, no labels
                shuffle=False)  # keep data in same order as labels
        image_count = len(generator.filenames)
        predictions = model.predict_generator(generator, image_count)
        y_pred = np.argmax(predictions, axis=1)
        y_pred[np.max(predictions, axis=1) < 1 / 9] = '8'
        y_pred = [str(_) for _ in np.argmax(predictions, axis=1)]
        return CLASS_NAMES[int(y_pred[0])]

#TEST URLS

# lantana_url = 'https://upload.wikimedia.org/wikipedia/commons/5/52/LantanaFlowerLeaves.jpg'
# rubbervine_url = 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Starr_980529-4191_Cryptostegia_grandiflora.jpg'
# snakeweed_url = 'https://upload.wikimedia.org/wikipedia/commons/9/95/Blue_Snakeweed_%282095033321%29.jpg'
# chinee_url = 'https://t1.gstatic.com/images?q=tbn:ANd9GcRd3ip7rIxsiQ1rf1OGakMYH7miF38aueCU6YMCUOOwfWteUk8-3iWzOdk7uuiSjd-MEDsYHvts4fCNBg&ec=72399393'
# parkinsonia_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw89mw5RHT9mPtDBuRi9xHFUmcmJ7crrCx2pcCaXFeREtN_CB-292WFC5bk59ILeZp1qI&usqp=CAU'
# prickly_url = 'https://www.business.qld.gov.au/__data/assets/image/0028/81829/varieties/165wh.jpg'
# siam_url = 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Chromolaena_odorata_by_Ashasathees.jpg'
# parthenium_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY7y5rvEa0V5ruSQ9cg0XXR8GpF_SrMfQ8ryAWjFW-GEgVo7qAfNV3&usqp=CAE&s'

# print(return_back(lantana_url))
# print(return_back(rubbervine_url))
# print(return_back(snakeweed_url))
# print(return_back(chinee_url))
# print(return_back(parkinsonia_url))
# print(return_back(prickly_url))
# print(return_back(siam_url))
# print(return_back(parthenium_url))