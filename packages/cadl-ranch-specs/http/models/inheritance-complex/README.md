The inheritance-complex test cases cover input and output of conditions:

- three level inheritances with no discriminator. (pet->cat->siamese)
- three level inheritances with discriminators. (Fish->shark->sawshark)
- collection of instances (cat.hates, Fish.siblings).
- recursive three level polymorphic models. (Fish.siblings)
- how is the serialization/deserialization when missing discriminator in models
