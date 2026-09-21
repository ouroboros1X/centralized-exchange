Centralized Exchange (CEX)

An educational centralized exchange built from first principles to understand how an exchange works internally — from order placement and matching to persistence, real-time updates, and failure recovery.

Overview

This project is a Centralized Exchange (CEX) currently under development.

The goal is to understand and implement the internal systems that make a CEX work rather than treating the exchange as a black box.

The project focuses on:

Order placement and validation

Order books

Matching engines

Trade execution

Balance management

Database persistence

Real-time market updates

In-memory processing

Data consistency

Failure recovery

Low-latency system design

Tech Stack

Frontend

TypeScript

React

Bun

Spectrum UI — selected components, mainly charts and trading visualizations

Backend

TypeScript

Bun

Bun is used in place of npm for the JavaScript/TypeScript runtime and package-management workflow.

Database

PostgreSQL

Supabase

Prisma 7

Supabase provides the hosted PostgreSQL database, while Prisma 7 is used for schema management, migrations, and database access.

State

The current design combines:

In-memory state for latency-sensitive operational data

PostgreSQL for durable persistent data

High-Level Architecture

                         ┌─────────────────────┐
                         │     React Client    │
                         │    TypeScript UI    │
                         └──────────┬──────────┘
                                    │
                         REST / WebSocket
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │       Backend       │
                         │   TypeScript/Bun    │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Matching Engine   │
                         │                     │
                         │   In-Memory State   │
                         └──────────┬──────────┘
                                    │
                       ┌────────────┴────────────┐
                       │                         │
                       ▼                         ▼
              ┌─────────────────┐       ┌─────────────────┐
              │  In-Memory Data  │       │   PostgreSQL    │
              │                 │       │    Supabase     │
              │ Order Book      │       │ Durable State   │
              │ Market State    │       │ Users / Orders  │
              │ Matching State  │       │ Trades / Ledger │
              └─────────────────┘       └─────────────────┘
                                               │
                                               ▼
                                      ┌─────────────────┐
                                      │    Prisma 7     │
                                      └─────────────────┘

Why In-Memory Processing?

Trading systems have latency-sensitive operations.

A simplified order lifecycle is:

Order Request
     ↓
Validation
     ↓
Order Book
     ↓
Matching
     ↓
Trade Execution
     ↓
Market Update

The project is exploring how much of this critical path can be handled in memory instead of repeatedly relying on persistent database operations.

An in-memory order book allows active market state to remain close to the matching process:

Order
  ↓
Validation
  ↓
In-Memory Order Book
  ↓
Matching Engine
  ↓
Trade
  ↓
Persistence

The objective is to reduce unnecessary latency while still maintaining durable records.

Bare Metal and Virtualization

The project is also exploring the relationship between infrastructure and latency.

A latency-sensitive exchange may use dedicated hardware for critical workloads. The project therefore explores the idea of running critical exchange infrastructure on bare-metal servers.

Conceptually:

Bare Metal

Application
    ↓
Operating System
    ↓
Hardware

Virtualized Infrastructure

Application
    ↓
Guest OS
    ↓
Hypervisor
    ↓
Host Infrastructure
    ↓
Hardware

Modern virtualization can provide excellent performance, so the goal is not to assume that virtualization is always slow. The important engineering question is how to achieve low and predictable latency for the critical trading path.

In-Memory + Database Model

In-memory state

Intended for latency-sensitive working state:

Order books

Active orders

Price levels

Matching state

Market state

Runtime WebSocket state

Temporary processing state

Persistent database state

Intended for durable information:

Users

Accounts

Assets

Balances

Markets

Orders

Trades

Fills

Ledger entries

Deposits

Withdrawals

The general principle is:

Memory = fast operational state
Database = durable state

Important financial state should not exist only in RAM.

Challenges Being Explored

1. Data Loss

If important state exists only in memory, a process or server failure can cause that state to disappear.

Potential failures include:

Server crash

Power failure

Hardware failure

Kernel failure

Process crash

Unexpected restart

The project will explore ways to recover state after these failures.

2. Persistence

The system needs to determine when operational state should be persisted.

There is a trade-off:

More synchronous persistence
        ↓
More durability
        ↓
Potentially higher latency

versus:

More in-memory processing
        ↓
Lower latency
        ↓
Higher recovery complexity

3. Crash Recovery

After a restart, the system should be able to reconstruct its operational state.

A possible recovery flow:

Server Restart
      ↓
Load Durable State
      ↓
Recover Orders / Trades
      ↓
Reconstruct Order Book
      ↓
Validate State
      ↓
Resume Matching

4. Consistency

Memory and persistent storage must not diverge.

For example:

In-memory balance: 100 USDT
Database balance:   80 USDT

or:

Order exists in memory
but is missing from durable state

The project will explore mechanisms for maintaining consistency.

5. Ordering

Trading systems are sensitive to event ordering.

For example:

Order A
Order B
Order C

can produce a different result from:

Order B
Order A
Order C

The project will therefore explore:

Sequence numbers

Event ordering

Deterministic processing

Matching-engine state

Recovery ordering

6. Concurrency

Many users can submit orders simultaneously.

The system must handle:

Race conditions

Concurrent requests

Order-book mutations

Balance locking

Trade execution

Database transactions

7. Scaling

A single authoritative in-memory order book creates architectural constraints.

For example:

Market
  ↓
Authoritative Order Book
  ↓
Matching Engine

Distributing that state across multiple machines introduces additional problems around consistency, ordering, coordination, and recovery.

Core CEX Concepts

Assets

An asset is something that can be held or traded.

Examples:

BTC
ETH
SOL
USDT

Markets

A market represents a trading pair.

Examples:

BTC/USDT
ETH/USDT
SOL/USDT

Orders

Orders represent requests to buy or sell.

Examples:

LIMIT
MARKET
STOP

with:

BUY
SELL

Order Book

The order book maintains active bids and asks.

ASKS
────────────────
105.20   2.1
105.10   1.4
105.00   3.7
────────────────
104.90   2.8
104.80   1.9
104.70   4.2
────────────────
BIDS

The implementation is intended to use in-memory data structures for the active order book.

Matching Engine

The matching engine determines when compatible orders can execute.

BUY  100 @ 105
SELL 100 @ 105
       ↓
     MATCH
       ↓
      TRADE

Trade

A trade represents an execution produced by the matching engine.

Fill

A fill represents the execution effect on an individual order.

Ledger

A ledger records financial movements and provides an auditable history of account changes.

Database Architecture

The current database stack is:

Application
     ↓
Prisma 7
     ↓
PostgreSQL
     ↓
Supabase

The database is not intended to replace the in-memory matching state.

Instead:

                 ┌──────────────────┐
                 │ Matching Engine  │
                 │   In Memory      │
                 └────────┬─────────┘
                          │
                    Persist Results
                          │
                          ▼
                 ┌──────────────────┐
                 │   PostgreSQL     │
                 │    Supabase      │
                 └──────────────────┘

Frontend

The frontend uses:

React

TypeScript

Bun

Spectrum UI is used selectively to accelerate frontend development, particularly for trading visualization.

Components include areas such as:

Market charts

Candlestick charts

Indicator charts

Depth charts

Portfolio charts

Statistics cards

Order-book UI

The UI components do not define the exchange's core trading logic.

Monorepo Structure

CEX/
├── apps/
│   ├── frontend/
│   ├── backend/
│   └── websockets/
│
├── packages/
│   └── db/
│
├── package.json
├── bun.lock
└── ...

apps/frontend

React + TypeScript trading interface.

apps/backend

HTTP/API layer for application requests.

apps/websockets

Real-time communication for market and account updates.

packages/db

Prisma configuration, schema, migrations, and database-related code.

Development Philosophy

This is primarily a learning-oriented implementation.

The goal is to understand:

How does a centralized exchange actually work internally?

The project emphasizes:

First-principles implementation

Understanding order books

Understanding matching

Understanding persistence

Understanding consistency

Understanding failure recovery

Understanding low-latency architecture

Understanding database design

Understanding real-time systems

Frontend component libraries are used where they save development time, while the exchange's core logic is intended to be implemented independently.

Current Status

Designed / Completed

CEX concept and scope

Wireframes

Database schema design

System design

System architecture

Monorepo structure

Initial frontend setup

Initial charting components

Under Development

Frontend UI

Backend

WebSocket infrastructure

Prisma 7 database layer

PostgreSQL/Supabase integration

In-memory order book

Matching engine

Future Areas

Authentication

Order validation

Balance locking

Trade execution

Ledger system

Deposits

Withdrawals

Failure recovery

State reconstruction

Auditability

Performance testing

Load testing

Distributed architecture

Disclaimer

This is an educational project and is not a production-ready cryptocurrency exchange.

A production CEX requires extensive work in areas including:

Security

Custody

Key management

Financial controls

Compliance

Risk management

Infrastructure redundancy

Disaster recovery

Monitoring

Auditing

Legal and regulatory requirements

The purpose of this project is to learn how the underlying technology and architecture work by building the system from the ground up.

Goal

The long-term goal is to understand the complete lifecycle of an exchange operation:

User
 ↓
Order Request
 ↓
Validation
 ↓
Balance Lock
 ↓
Order Book
 ↓
Matching Engine
 ↓
Trade
 ↓
Balance Update
 ↓
Ledger
 ↓
Persistence
 ↓
WebSocket Update
 ↓
User

The project is about understanding every step in this pipeline — including what happens when things go wrong.