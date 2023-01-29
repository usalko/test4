import strawberry
from typing import List, Optional
from sqlmodel import Field, Session, SQLModel, create_engine, select, Relationship
from .schema_generation import create_array_relationship_resolver, create_query_root

class TeamModel(SQLModel, table=True):
    __tablename__ = 'team'
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    headquarters: str

    heroes: List["HeroModel"] = Relationship(back_populates="team")


class HeroModel(SQLModel, table=True):
    __tablename__ = 'hero'
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    secret_name: str
    age: Optional[int] = None

    team_id: Optional[int] = Field(default=None, foreign_key="team.id")
    team: Optional[TeamModel] = Relationship(back_populates="heroes")


@strawberry.experimental.pydantic.type(model=HeroModel, fields=['name', 'secret_name', 'age', 'team_id'])
class Hero: 
    pass

@strawberry.experimental.pydantic.type(model=TeamModel, fields=['name', 'headquarters', 'id'])
class Team:
    heroes: List[create_array_relationship_resolver(Hero)] = strawberry.field(
            resolver=create_array_relationship_resolver(Hero)
        )
    
sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": True}
engine = create_engine(sqlite_url, connect_args=connect_args)


SQLModel.metadata.create_all(engine)

def create_heroes():
    with Session(engine) as session:
        
        team_preventers = TeamModel(name="Preventers", headquarters="Sharp Tower")
        team_z_force = TeamModel(name="Z-Force", headquarters="Sister Margaret’s Bar")

        hero_deadpond = HeroModel(
            name="Deadpond", secret_name="Dive Wilson", team=team_z_force
        )
        hero_rusty_man = HeroModel(
            name="Rusty-Man", secret_name="Tommy Sharp", age=48, team=team_preventers
        )
        hero_spider_boy = HeroModel(name="Spider-Boy", secret_name="Pedro Parqueador")
        session.add(hero_deadpond)
        session.add(hero_rusty_man)
        session.add(hero_spider_boy)
        session.commit()

        session.refresh(hero_deadpond)
        session.refresh(hero_rusty_man)
        session.refresh(hero_spider_boy)

        print("Created hero:", hero_deadpond)
        print("Created hero:", hero_rusty_man)
        print("Created hero:", hero_spider_boy)

        hero_spider_boy.team = team_preventers
        session.add(hero_spider_boy)
        session.commit()
        session.refresh(hero_spider_boy)
        print("Updated hero:", hero_spider_boy)

        hero_black_lion = HeroModel(name="Black Lion", secret_name="Trevor Challa", age=35)
        hero_sure_e = HeroModel(name="Princess Sure-E", secret_name="Sure-E")
        team_wakaland = TeamModel(
            name="Wakaland",
            headquarters="Wakaland Capital City",
            heroes=[hero_black_lion, hero_sure_e],
        )
        session.add(team_wakaland)
        session.commit()
        session.refresh(team_wakaland)
        print("Team Wakaland:", team_wakaland)

        hero_tarantula = HeroModel(name="Tarantula", secret_name="Natalia Roman-on", age=32)
        hero_dr_weird = HeroModel(name="Dr. Weird", secret_name="Steve Weird", age=36)
        hero_cap = HeroModel(
            name="Captain North America", secret_name="Esteban Rogelios", age=93
        )

        team_preventers.heroes.append(hero_tarantula)
        team_preventers.heroes.append(hero_dr_weird)
        team_preventers.heroes.append(hero_cap)
        session.add(team_preventers)
        session.commit()
        session.refresh(hero_tarantula)
        session.refresh(hero_dr_weird)
        session.refresh(hero_cap)
# create_heroes()

def get_heroes() -> List[Hero]:
    with Session(engine) as session:
        heroes = session.exec(select(HeroModel)).all()
        return heroes

def get_team(team_id: int) -> Team:
    with Session(engine) as session:
        team = session.get(TeamModel, team_id)
        data = Team.from_pydantic(team)
        return data


Query = create_query_root([Hero, Team])

schema = strawberry.Schema(query=Query)