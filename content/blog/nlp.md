---
title: NLP Models and history
date: 2026-03-28
excerpt: A concise exploration of how NLP models evolved and how they understand and generate language.
---

### Why NLP?

In the previous course, I've learnt NLP and it was interesting time for me because "Natural Language" has different pattern, symbole and phase but somehow machine looks understand and response. It was amazing. I took some time to deep dive NLP world and now lit bit clear, so I would like to write some blog about NLP.

### Model Understanding

First of all, what is NLP? well, Natural Language Processing (NLP) is programm which can enable to understand human lunguage to machine to process, understand and generate new language in mathmatical way. What makes this field particularly interesting is not only its practical applications, but also how its approach has fundamentally changed over time.

### First generation: Rule-Based NLP

In its earliest stage, NLP relied on rule-based systems. Researchers attempted to encode language explicitly through grammatical structures such as Context-Free Grammar (CFG). These systems were grounded in linguistic theory and focused heavily on syntax, but they required extensive manual effort and struggled to handle ambiguity. Language, as it turned out, was far too complex to be fully captured by predefined rules.

- Context free grammer (CFG)
- Phase Structure Grammer

### Second generation: Statistical NLP

The next shift came with statistical NLP, where language began to be treated as a probabilistic system. Instead of defining rules, models estimated the likelihood of word sequences based on large corpora. Techniques such as N-gram models and TF-IDF allowed systems to make predictions based on frequency and co-occurrence. While this approach improved scalability and adaptability, it still lacked a deeper understanding of meaning.

- N-gram
- TF-IDF

### Third generation: Neural NLP (Vector-Based Semantics)

A more significant transformation occurred with the introduction of neural networks. In neural NLP, words were no longer treated as discrete symbols but as vectors in a continuous space. Models like Word2Vec enabled machines to capture semantic relationships between words, while architectures such as RNNs and LSTMs introduced the ability to process sequential data. This marked a transition from surface-level pattern recognition to a more meaningful representation of language.

- RNN
- LSTM
- Word2Vec

### Forth generation: Transformer-Based NLP

The most recent breakthrough is the emergence of Transformer-based models. By leveraging self-attention mechanisms, these models can capture relationships across entire sentences or even documents, rather than relying solely on sequential processing. Models such as BERT, GPT, and LLaMA exemplify this paradigm, demonstrating an unprecedented ability to understand context and generate coherent text. This shift has fundamentally redefined what machines can achieve in language tasks.

- BERT
- GPT-4
- Llama

### Core Tasks of NLP Models

Despite these advancements, the core functions of NLP remain consistent. NLP systems are designed to understand language, generate language, and process text into forms that machines can work with. Understanding involves interpreting intent and extracting meaning, generation focuses on producing human-like responses, and preprocessing transforms raw text into structured representations through techniques such as tokenization and morphological analysis.

There may never be a perfect model of language. However, the trajectory of NLP suggests that we are steadily moving toward systems that do not just process words, but engage with meaning itself.
